import AbstractObserver from '../utils/abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this.Offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }
}
