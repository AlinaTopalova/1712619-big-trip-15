import './view/editForm.js';
import './view/cost.js';
import './view/filters.js';
import './view/tripInfo.js';
import './view/siteNavigation.js';
import './view/tripSort.js';
import './view/waypoint.js';
import './view/eventsList.js';
import './view/eventElement';
import './mock/wayPoint-mock';

import { createInfoTripTemplate } from './view/tripInfo.js';
import { createHeaderNavigationTemplate } from './view/siteNavigation.js';
import { createFiltersTripTemplate } from './view/filters.js';
import { createSortTripTemplate } from './view/tripSort.js';
import { createTripCostTemplate } from './view/cost.js';
import { createWaypointTemplate } from './view/waypoint.js';
import { createEventsListTemplate } from './view/eventsList.js';
import { createTripEditTemplate } from './view/editForm.js';
import { createEventElementTemplate } from './view/eventElement.js';
import { generateWayPoints } from './mock/wayPoint-mock';

const WAYPOINTS_COUNT = 10;

const siteHeaderEl = document.querySelector('.page-header');
const headerInfoTripEl = siteHeaderEl.querySelector('.trip-main');
const headerNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const headerFiltersEl = siteHeaderEl.querySelector('.trip-controls__filters');

const pageMainEl = document.querySelector('.page-main');
const bodyContainerEl = pageMainEl.querySelector('.page-body__container');
const tripEventsEl = bodyContainerEl.querySelector('.trip-events');

const wayPoints = generateWayPoints(WAYPOINTS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const addTripEvent = (container, tripEvent) => {
  const template = createEventElementTemplate(tripEvent);
  render(container, template, 'beforeend');
};

render(headerInfoTripEl, createInfoTripTemplate(wayPoints), 'afterbegin');
render(headerNavigationEl, createHeaderNavigationTemplate(), 'beforeend');
render(headerFiltersEl, createFiltersTripTemplate(), 'beforeend');
render(tripEventsEl, createSortTripTemplate(), 'beforeend');
render(headerInfoTripEl.querySelector('.trip-info'), createTripCostTemplate(wayPoints), 'beforeend');
render(tripEventsEl, createEventsListTemplate(), 'beforeend');

const tripEventsList = tripEventsEl.querySelector('.trip-events__list');

addTripEvent(tripEventsList, createTripEditTemplate(wayPoints[0]));

for (let i = 0; i < WAYPOINTS_COUNT; i++) {
  addTripEvent(tripEventsList, createWaypointTemplate(wayPoints[i]));
}
