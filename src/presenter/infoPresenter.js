import TripInfoView from '../view/tripInfo';
import RouteTripView from '../view/tripRout.js';
import CostTripView from '../view/tripCost.js';

import { render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';

export default class Info {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._infoContainer = document.querySelector('.trip-main');
    this._tripInfoView = new TripInfoView();
    this._routeTripView = new RouteTripView(this._waypoints);
    this._costTripView = new CostTripView(this._waypoints);
  }

  renderTripInfo() {
    render(this._infoContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
    render(this._tripInfoView, this._routeTripView, RenderPosition.BEFOREEND);
    render(this._tripInfoView, this._costTripView, RenderPosition.BEFOREEND);
  }
}
