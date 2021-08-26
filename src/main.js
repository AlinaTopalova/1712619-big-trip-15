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

import SiteNavigationView from './view/siteNavigation.js';
//import FiltersTripView from './view/filters.js';
import TripPresenter from './presenter/tripPresenter.js';
import InfoPresenter from './presenter/infoPresenter.js';
import FilterPresenter from './presenter/filterPresenter.js';
import WaypointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import { generateWaypoints } from './mock/wayPoint-mock.js';
import { render } from './utils/render.js';
import { RenderPosition } from './constants.js';

const WAYPOINTS_COUNT = 10;
const waypoints = generateWaypoints(WAYPOINTS_COUNT).sort((a,b) => a.startDate - b.startDate);

const waypointsModel = new WaypointsModel();
waypointsModel.setWaypoints(waypoints);

const filterModel = new FilterModel();

const siteHeaderEl = document.querySelector('.page-header');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = document.querySelector('.trip-controls__filters');

render(siteNavigationEl, new SiteNavigationView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(waypointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersEl, filterModel, waypointsModel);
tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
});


const infoPresenter = new InfoPresenter(waypoints);
infoPresenter.renderTripInfo();
