import EventsListView from '../view/eventsList.js';
import SortTripView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import LoadingView from '../view/loading.js';
import WaypointPresenter, {State as WaypointPresenterViewState} from './waypointPresenter.js';
import WaypointNewPresenter from './waypoint-new.js';

import { remove, render } from '../utils/render.js';
import { isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';
import { RenderPosition } from '../constants.js';
import { sortDayUp, sortPriceDown, sortTimeDurationDown } from '../utils/date.js';
import { SortType, UpdateType, UserAction, FiltersType } from '../constants.js';
import { filter } from '../utils/filter.js';

export default class Trip {
  constructor(waypointsModel, filterModel, offersModel, destinationsModel, api) {
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._tripEventsContainer = document.querySelector('.trip-events');
    this._waypointPresenters = new Map();
    this._filterType = FiltersType.EVERYTHING;
    this._currentSortType = SortType.DAY;
    this._isLoading = true;


    this._eventsListView = new EventsListView();
    this._sortTripView = null;
    this._noWaypointView = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._waypointNewPresenter = new WaypointNewPresenter(this._eventsListView, this._handleViewAction);
  }

  init() {
    render(this._tripEventsContainer, this._eventsListView, RenderPosition.BEFOREEND);
    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    remove(this._eventsListView);
    this._waypointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createWaypoint() {
    if (!isOnline()) {
      toast('You can\'t create new point offline');
      return;
    }
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FiltersType.EVERYTHING);
    this._waypointNewPresenter.init(this._offersModel, this._destinationsModel);
  }

  _getWaypoints() {
    this._filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filteredWaypoints = filter[this._filterType](waypoints);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredWaypoints.sort(sortDayUp);
      case SortType.TIME:
        return filteredWaypoints.sort(sortTimeDurationDown);
      case SortType.PRICE:
        return filteredWaypoints.sort(sortPriceDown);
    }
    return filteredWaypoints;
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._eventsListView, this._handleViewAction, this._handleModeChange);
    waypointPresenter.init(waypoint, this._offersModel, this._destinationsModel);
    this._waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  _renderWaypoints(waypoints) {
    waypoints.forEach((waypoint) => {
      this._renderWaypoint(waypoint);
    });
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this._waypointPresenters.get(update.id).setViewState(WaypointPresenterViewState.SAVING);
        this._api.updateWaypoint(update)
          .then((response) => {
            this._waypointsModel.updateWaypoint(updateType, response);
          })
          .catch(() => {
            this._waypointPresenters.get(update.id).setViewState(WaypointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_WAYPOINT:
        this._waypointNewPresenter.setSaving();
        this._api.addWaypoint(update)
          .then((response) => {
            this._waypointsModel.addWaypoint(updateType, response);
          })
          .catch(() => {
            this._waypointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_WAYPOINT:
        this._waypointPresenters.get(update.id).setViewState(WaypointPresenterViewState.DELETING);
        this._api.deleteWaypoint(update)
          .then(() => {
            this._waypointsModel.deleteWaypoint(updateType, update);
          })
          .catch(() => {
            this._waypointPresenters.get(update.id).setViewState(WaypointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingView);
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._waypointNewPresenter.destroy();
    this._waypointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortTripView !== null) {
      this._sortTripView = null;
    }
    this._sortTripView = new SortTripView(this._currentSortType);
    this._sortTripView.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripEventsContainer, this._sortTripView, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    this._loadingView = new LoadingView();
    render(this._eventsListView, this._loadingView, RenderPosition.AFTERBEGIN);
  }

  _renderNoWaypoints() {
    this._noWaypointView = new NoWaypointView(this._filterType);
    render(this._eventsListView, this._noWaypointView, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const waypoints = this._getWaypoints();
    if (waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }
    this._renderSort();
    this._renderWaypoints(waypoints.slice());
  }

  _clearTrip({resetSortType = false} = {}) {
    this._waypointNewPresenter.destroy();
    this._waypointPresenters.forEach((presenter) => presenter.destroy());
    this._waypointPresenters.clear();
    remove(this._sortTripView);
    remove(this._loadingView);

    if (this._noWaypointView) {
      remove(this._noWaypointView);
    }

    if(resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}


