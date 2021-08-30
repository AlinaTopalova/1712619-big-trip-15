import AbstractView from './abstract';
import { formattedDate, DATE_FORMAT } from '../utils/date.js';

const createRouteTripTemplate = (waypoints) => {
  const startDate = waypoints[0].startDate;
  const finishDate = waypoints[waypoints.length - 1].finishDate;

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
    `${formattedDate(startDate, DATE_FORMAT.DAYMONTH)}&nbsp;&mdash;&nbsp;${formattedDate(finishDate, DATE_FORMAT.DAY)}`:
    `${formattedDate(startDate, DATE_FORMAT.DAYMONTH)}&nbsp;&mdash;&nbsp;${formattedDate(finishDate, DATE_FORMAT.DAYMONTH)}`}
  </p>
  </div>`;
};

export default class RouteTrip extends AbstractView {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createRouteTripTemplate(this._waypoints);
  }
}

// <p class="trip-info__dates">${formatedStartDate} &nbsp;&mdash;&nbsp;${formatedfinishDate}</p>
