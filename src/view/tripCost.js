import AbstractView from './abstract';

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

export default class CostTrip extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createCostTripTemplate(this._points);
  }
}
