import dayjs from 'dayjs';
import { createElement, formatedDate } from '../utils.js';

const createRouteTripTemplate = (waypoints) => {
  const startDate = waypoints[0].startDate;
  const finishDate = waypoints[waypoints.length - 1].finishDate;
  const formatedfinishDay = dayjs(finishDate).format('DD');

  const cities = waypoints.map((waypoint) => waypoint.city);
  const uniqueCities = Array.from(new Set(cities));

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">
     ${(uniqueCities.length >= 3) ?
    `${uniqueCities[0]} &mdash; ... &mdash; ${uniqueCities[uniqueCities.length - 1]}`:
    `${uniqueCities[0]} &mdash; ${uniqueCities[1]}`}
  </h1>
  <p class="trip-info__dates">
  ${(startDate.getMonth() === finishDate.getMonth()) ?
    `${formatedDate(startDate)}&nbsp;&mdash;&nbsp;${formatedfinishDay}`:
    `${formatedDate(startDate)}&nbsp;&mdash;&nbsp;${formatedDate(finishDate)}`}
  </p>
  </div>`;
};

export default class RouteTrip {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._element = null;
  }

  getTemplate() {
    return createRouteTripTemplate(this._waypoints);
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

// <p class="trip-info__dates">${formatedStartDate} &nbsp;&mdash;&nbsp;${formatedfinishDate}</p>
