import { createElement } from '../utils.js';

const createCostTripTemplate = (wayPoints) => {
  const {price} = wayPoints;

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;
};

export default class CostTrip {
  constructor(wayPoints) {
    this._wayPoints = wayPoints;
    this._element = null;
  }

  getTemplate() {
    return createCostTripTemplate(this._wayPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
