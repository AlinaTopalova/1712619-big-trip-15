import './view/editForm.js';
import './view/tripInfo.js';
import './view/tripCost.js';
import './view/tripRout.js';
import './view/filters.js';
import './view/siteNavigation.js';
import './view/sort.js';
import './view/waypoint.js';
import './view/eventsList.js';
import './mock/wayPoint-mock.js';
import './view/no-waypoint.js';

import TripInfoView from './view/tripInfo.js';
import RouteTripView from './view/tripRout.js';
import CostTripView from './view/tripCost.js';
import SiteNavigationView from './view/siteNavigation.js';
import EventsListView from './view/eventsList.js';
import WaypointView from './view/waypoint.js';
import FiltersTripView from './view/filters.js';
import SortTripView from './view/sort.js';
import TripEditView from './view/editForm.js';
import NoWaypointView from './view/no-waypoint.js';

import { generateWaypoints } from './mock/wayPoint-mock.js';
import { render } from './utils.js';
import { RenderPosition } from './constants.js';

const WAYPOINTS_COUNT = 4;
const waypoints = generateWaypoints(WAYPOINTS_COUNT).sort((a,b) => a.startDate - b.startDate);

const siteHeaderEl = document.querySelector('.page-header');
const tripInfoEl = siteHeaderEl.querySelector('.trip-main');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = siteHeaderEl.querySelector('.trip-controls__filters');
const pageMainEl = document.querySelector('.page-main');
const tripEventsEl = pageMainEl.querySelector('.trip-events');

render(siteNavigationEl, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);
render(filtersEl, new FiltersTripView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsEl, new EventsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEventsEl.querySelector('.trip-events__list');

const renderEventTripList = (eventListElement, point) => {
  const waypointComponent = new WaypointView(point);
  const waypointEditComponent = new TripEditView(point);

  const replaceWaypointToEdit = () => {
    eventListElement.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceEditToWaypoint = () => {
    eventListElement.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onCancelPressed = (evt) => {
    if (evt.target.classList.contains('event__reset-btn')) {
      replaceEditToWaypoint();
    }
  };

  waypointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceWaypointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
    waypointEditComponent.getElement().addEventListener('click', onCancelPressed);
  });

  waypointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};

if (waypoints.length === 0) {
  render(tripEventsEl, new NoWaypointView().getElement(), RenderPosition.AFTERBEGIN);
} else {
  const tripInfoComponent = new TripInfoView();
  render(tripInfoEl, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteTripView(waypoints).getElement(), RenderPosition.BEFOREEND);
  render(tripInfoComponent.getElement(), new CostTripView(waypoints).getElement(), RenderPosition.BEFOREEND);
  render(tripEventsEl, new SortTripView().getElement(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < WAYPOINTS_COUNT; i++) {
    renderEventTripList(tripEventsList, waypoints[i]);
  }
}


