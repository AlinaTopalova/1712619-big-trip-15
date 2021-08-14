import TripInfoView from '../view/tripInfo';
import RouteTripView from '../view/tripRout.js';
import CostTripView from '../view/tripCost.js';

import { render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';

export default class Info {
  constructor() {
    this._infoContainer = document.querySelector('.trip-main');
  }

  renderTripInfo(waypoints) {
    const tripInfoView = new TripInfoView();
    const routeTripView = new RouteTripView(waypoints);
    const costTripView = new CostTripView(waypoints);
    render(this._infoContainer, tripInfoView, RenderPosition.AFTERBEGIN);
    render(tripInfoView, routeTripView, RenderPosition.BEFOREEND);
    render(tripInfoView, costTripView, RenderPosition.BEFOREEND);
  }
}
