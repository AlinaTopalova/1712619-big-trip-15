import dayjs from 'dayjs';
import { createElement } from '../utils.js';

const createRouteTripTemplate = (wayPoints) => {
  const startDate = wayPoints[0].startDate;
  const finishDate = wayPoints[wayPoints.length - 1].finishDate;
  const formatedStartDate = dayjs(startDate).format('MMM DD');
  const formatedfinishDate = dayjs(finishDate).format('DD');

  const cities = wayPoints.map((wayPoint) => wayPoint.city);
  const uniqueCities = Array.from(new Set(cities));

  return `<div class="trip-info__main">
            <h1 class="trip-info__title">
            ${(uniqueCities.length > 3) ? `${uniqueCities[0]} &mdash; ... &mdash; ${uniqueCities[uniqueCities.length - 1]}`: `${uniqueCities[0]} &mdash; ${uniqueCities[1]} &mdash; ${uniqueCities[2]}`}
            </h1>
            <p class="trip-info__dates">${formatedStartDate} &nbsp;&mdash;&nbsp;${formatedfinishDate}</p>
          </div>`;
};

export default class RouteTrip {
  constructor(wayPoints) {
    this._wayPoints = wayPoints;
    this._element = null;
  }

  getTemplate() {
    return createRouteTripTemplate(this._wayPoints);
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
