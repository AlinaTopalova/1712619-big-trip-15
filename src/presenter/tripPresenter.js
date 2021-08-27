import EventsListView from '../view/eventsList.js';
import SortTripView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypointPresenter.js';
import WaypointNewPresenter from './waypoint-new.js';

import { remove, render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { sortDayUp, sortPriceDown, sortTimeDurationDown } from '../utils/date.js';
import { SortType, UpdateType, UserAction, FiltersType } from '../constants.js';
import { filter } from '../utils/filter.js';

export default class Trip {
  constructor(waypointsModel, filterModel) {
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._tripEventsContainer = document.querySelector('.trip-events');
    this._waypointPresenters = new Map();
    this._filterType = FiltersType.EVERYTHING;
    this._currentSortType = SortType.DAY;

    this._eventsListView = new EventsListView();
    this._sortTripView = null;
    this._noWaypointView = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._waypointNewPresenter = new WaypointNewPresenter(this._eventsListView, this._handleViewAction);  // не уверена в this._eventsListView
  }

  init() {
    render(this._tripEventsContainer, this._eventsListView, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  createWaypoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FiltersType.EVERYTHING);
    this._waypointNewPresenter.init();
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
    waypointPresenter.init(waypoint);
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
        this._waypointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this._waypointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this._waypointsModel.deleteWaypoint(updateType, update);
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

  _renderNoWaypoints() {
    this._noWaypointView = new NoWaypointView(this._filterType);
    render(this._tripEventsContainer, this._noWaypointView, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
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

    if (this._noWaypointView) {
      remove(this._noWaypointView);
    }

    if(resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}


