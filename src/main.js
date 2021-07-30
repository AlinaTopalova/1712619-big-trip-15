import './view/editForm.js';
import './view/cost.js';
import './view/filters.js';
import './view/tripInfo.js';
import './view/siteNavigation.js';
import './view/tripSort.js';
import './view/waypoint.js';
import './view/eventsList.js';
import './view/eventElement';

import { createInfoTripTemplate } from './view/tripInfo.js';
import { createHeaderNavigationTemplate } from './view/siteNavigation.js';
import { createFiltersTripTemplate } from './view/filters.js';
import { createSortTripTemplate } from './view/tripSort.js';
import { createTripCostTemplate } from './view/cost.js';
import { createWaypointTemplate } from './view/waypoint.js';
import { createEventsListTemplate } from './view/eventsList.js';
import { createTripEditTemplate } from './view/editForm.js';
import { createEventElementTemplate } from './view/eventElement.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const addTripEvent = (container, event) => {
  const template = createEventElementTemplate(event);
  render(container, template, 'beforeend');
};

const siteHeaderElement = document.querySelector('.page-header');
const headerInfoTripElement = siteHeaderElement.querySelector('.trip-main');
const headerNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const headerFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-main');
const bodyContainer = pageMain.querySelector('.page-body__container');
const tripEvents = bodyContainer.querySelector('.trip-events');

render(headerInfoTripElement, createInfoTripTemplate(), 'afterbegin');
render(headerNavigationElement, createHeaderNavigationTemplate(), 'beforeend');
render(headerFiltersElement, createFiltersTripTemplate(), 'beforeend');
render(tripEvents, createSortTripTemplate(), 'beforeend');
render(headerInfoTripElement.querySelector('.trip-info'), createTripCostTemplate(), 'beforeend');
render(tripEvents, createEventsListTemplate(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');

addTripEvent(tripEventsList, createTripEditTemplate());
addTripEvent(tripEventsList, createWaypointTemplate());
addTripEvent(tripEventsList, createWaypointTemplate());
addTripEvent(tripEventsList, createWaypointTemplate());
addTripEvent(tripEventsList, createWaypointTemplate());


