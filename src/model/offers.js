import AbstractObserver from '../utils/abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }
}
