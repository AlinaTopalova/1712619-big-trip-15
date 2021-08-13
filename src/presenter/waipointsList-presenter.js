import TripInfoView from '../view/tripInfo';
import RouteTripView from '../view/tripRout.js';
import CostTripView from '../view/tripCost.js';
import EventsListView from '../view/eventsList.js';
import SortTripView from '../view/sort.js';
import NoWaypointView from '../view/no-waypoint.js';
import WaypointPresenter from './waypoint-presenter.js';

import { render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { updateItem } from '../utils/common.js';

export default class WaypointsList {
  constructor(tripEventsContainer, tripInfoContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._waypointPresenter = new Map();

    this._eventsListComponent = new EventsListView();
    this._noWaypointComponent = new NoWaypointView();
    this._sortTripComponent = new SortTripView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    render(this._tripEventsContainer, this._eventsListComponent, RenderPosition.BEFOREEND);

    this._renderWaypointsList(waypoints);
  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._eventsListComponent, this._handleWaypointChange, this._handleModeChange);
    waypointPresenter.init(waypoint);
    this._waypointPresenter.set(waypoint.id, waypointPresenter);
  }

  _handleWaypointChange(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  }

  _handleModeChange() {
    this._waypointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortTripComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo(waypoints) {
    const tripInfoComponent = new TripInfoView();
    const routeTripComponent = new RouteTripView(waypoints);
    const costTripComponent = new CostTripView(waypoints);
    render(this._tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, routeTripComponent, RenderPosition.BEFOREEND);
    render(tripInfoComponent, costTripComponent, RenderPosition.BEFOREEND);
  }

  _clearWaypointsList() {
    this._waypointPresenter.forEach((presenter) => presenter.destroy());
    this._waypointPresenter.clear();
  }

  _renderWaypointsList(waypoints) {
    if (waypoints.length === 0) {
      this._renderNoWaypoints();
    } else {
      this._renderTripInfo(waypoints);
      this._renderSort();
      for (let i = 0; i < waypoints.length; i++) {
        this._renderWaypoint(waypoints[i]);
      }
    }
  }
}

