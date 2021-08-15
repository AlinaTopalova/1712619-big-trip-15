import EventsListView from '../view/eventsList.js';
import SortTripView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypointPresenter.js';
import InfoPresenter from './infoPresenter.js';

import { render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { updateItem } from '../utils/common.js';
import { sortPriceDown, sortTimeDurationDown } from '../utils/date.js';
import { SortType } from '../constants.js';

export default class Trip {
  constructor() {
    this._tripEventsContainer = document.querySelector('.trip-events');
    this._waypointPresenters = new Map();
    this._currentSortType = SortType.DAY;

    this._eventsListView = new EventsListView();
    this._noWaypointView = new NoWaypointView();
    this._sortTripView = new SortTripView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._sourcedWaypoints = waypoints.slice();
    render(this._tripEventsContainer, this._eventsListView, RenderPosition.BEFOREEND);

    this._renderTrip(waypoints);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._eventsListView, this._handleWaypointChange, this._handleModeChange);
    waypointPresenter.init(waypoint);
    this._waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  _handleWaypointChange(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._sourcedWaypoints = updateItem(this._sourcedWaypoints, updatedWaypoint);
    this._waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
  }

  _handleModeChange() {
    this._waypointPresenters.forEach((presenter) => presenter.resetView());
  }

  _sortWaypoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this._waypoints.sort(sortTimeDurationDown);
        break;
      case SortType.PRICE:
        this._waypoints.sort(sortPriceDown);
        break;
      default:
        this._waypoints = this._sourcedWaypoints.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }
    this._sortWaypoints(sortType);
    this._clearTrip();
    this._waypoints.forEach((waypoint) => {
      this._renderWaypoint(waypoint);
    });
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortTripView, RenderPosition.AFTERBEGIN);
    this._sortTripView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointView, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo(waypoints) {
    const infoPresenter = new InfoPresenter(waypoints);
    infoPresenter.renderTripInfo();
  }

  _clearTrip() {
    this._waypointPresenters.forEach((presenter) => presenter.destroy());
    this._waypointPresenters.clear();
  }

  _renderTrip(waypoints) {
    if (waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }
    this._renderTripInfo(waypoints);
    this._renderSort();
    waypoints.forEach((waypoint) => {
      this._renderWaypoint(waypoint);
    });
  }
}

