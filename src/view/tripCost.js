import { createElement } from '../utils.js';

const getPointPrice = (point) => {
  const {offers, price} = point;
  const offersPrice = offers.reduce((initialPrice, offer) => initialPrice + offer.price, 0);
  return offersPrice + price;
};

const getTotalPrice = (points) => points.reduce((initialTotal, point) => initialTotal + getPointPrice(point), 0);

const createCostTripTemplate = (points) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`
);

export default class CostTrip {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createCostTripTemplate(this._points);
  }

  getElement () {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
