import EventsListView from '../view/eventsList.js';
import SortTripView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypointPresenter.js';
import InfoPresenter from './infoPresenter.js';

import { render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { updateItem } from '../utils/common.js';

export default class Trip {
  constructor() {
    this._tripEventsContainer = document.querySelector('.trip-events');
    this._waypointPresenters = new Map();

    this._eventsListView = new EventsListView();
    this._noWaypointView = new NoWaypointView();
    this._sortTripView = new SortTripView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    render(this._tripEventsContainer, this._eventsListView, RenderPosition.BEFOREEND);

    this._renderWaypointsList(waypoints);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._eventsListView, this._handleWaypointChange, this._handleModeChange);
    waypointPresenter.init(waypoint);
    this._waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  _handleWaypointChange(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
  }

  _handleModeChange() {
    this._waypointPresenters.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortTripView, RenderPosition.AFTERBEGIN);
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointView, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo(waypoints) {
    const infoPresenter = new InfoPresenter();
    infoPresenter.renderTripInfo(waypoints);
  }

  _clearWaypointsList() {
    this._waypointPresenters.forEach((presenter) => presenter.destroy());
    this._waypointPresenters.clear();
  }

  _renderWaypointsList(waypoints) {
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

