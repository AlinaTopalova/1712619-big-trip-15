import TripInfoView from '../view/tripInfo.js';
import RouteTripView from '../view/tripRout.js';
import CostTripView from '../view/tripCost.js';

import { render, remove } from '../utils/render.js';
import { RenderPosition } from '../constants.js';

export default class Info {
  constructor(waypointsModel) {
    this._waypointsModel = waypointsModel;
    this._infoContainer = document.querySelector('.trip-main');
    this._tripInfoView = new TripInfoView();
    this._routeTripView = null;
    this._costTripView = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._waypointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTripInfo();
  }

  _removeTripInfo() {
    if (this._routeTripView !== null) {
      remove(this._routeTripView);
      remove(this._costTripView);
    }
  }

  _getWaypoints() {
    return this._waypointsModel.getWaypoints();
  }

  _renderTripInfo() {
    const waypoints = this._getWaypoints();
    if (waypoints.length > 0) {
      this._routeTripView = new RouteTripView(waypoints);
      this._costTripView = new CostTripView(waypoints);
      render(this._infoContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
      render(this._tripInfoView, this._routeTripView, RenderPosition.BEFOREEND);
      render(this._tripInfoView, this._costTripView, RenderPosition.BEFOREEND);
    }
  }

  _handleModelEvent() {
    this._removeTripInfo();
    this._renderTripInfo();
  }
}
