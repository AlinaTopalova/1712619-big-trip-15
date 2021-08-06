import './view/editForm.js';
import './view/tripInfo.js';
import './view/costTrip.js';
import './view/routeTrip.js';
import './view/filters.js';
import './view/siteNavigation.js';
import './view/sort.js';
import './view/waypoint.js';
import './view/eventsList.js';
import './mock/wayPoint-mock';

import TripInfoView from './view/tripInfo.js';
import RouteTripView from './view/routeTrip.js';
import CostTripView from './view/costTrip.js';
import SiteNavigationView from './view/siteNavigation.js';
import EventsListView from './view/eventsList.js';
import WayPointView from './view/waypoint.js';
import FiltersTripView from './view/filters.js';
import SortTripView from './view/sort.js';
import TripEditView from './view/editForm.js';

import { generateWayPoints } from './mock/wayPoint-mock.js';
import { render } from './utils.js';
import { RenderPosition } from './constants.js';

const WAYPOINTS_COUNT = 15;
const wayPoints = generateWayPoints(WAYPOINTS_COUNT).sort((a,b) => a.startDate - b.startDate);

const siteHeaderEl = document.querySelector('.page-header');
const headerInfoTripEl = siteHeaderEl.querySelector('.trip-main');
const headerNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const headerFiltersEl = siteHeaderEl.querySelector('.trip-controls__filters');
const pageMainEl = document.querySelector('.page-main');
const tripEventsEl = pageMainEl.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView();
render(headerInfoTripEl, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new RouteTripView(wayPoints).getElement(), RenderPosition.BEFOREEND);
render(tripInfoComponent.getElement(), new CostTripView(wayPoints).getElement(), RenderPosition.BEFOREEND);

render(headerNavigationEl, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);
render(headerFiltersEl, new FiltersTripView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsEl, new SortTripView().getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsEl, new EventsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEventsEl.querySelector('.trip-events__list');

const renderEventTripList = (eventListElement, point) => {
  const wayPointComponent = new WayPointView(point);
  const wayPointEditComponent = new TripEditView(point);

  const replaceWaypointToEdit = () => {
    eventListElement.replaceChild(wayPointEditComponent.getElement(), wayPointComponent.getElement());
  };

  const replaceEditToWaypoint = () => {
    eventListElement.replaceChild(wayPointComponent.getElement(), wayPointEditComponent.getElement());
  };

  wayPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceWaypointToEdit();
  });

  wayPointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToWaypoint();
  });

  render(eventListElement, wayPointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < WAYPOINTS_COUNT; i++) {
  renderEventTripList(tripEventsList, wayPoints[i]);
}


