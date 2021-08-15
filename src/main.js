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
import FiltersTripView from './view/filters.js';
import TripPresenter from './presenter/tripPresenter.js';
import { generateWaypoints } from './mock/wayPoint-mock.js';
import { render } from './utils/render.js';
import { RenderPosition } from './constants.js';

const WAYPOINTS_COUNT = 10;
const waypoints = generateWaypoints(WAYPOINTS_COUNT).sort((a,b) => a.startDate - b.startDate);

const siteHeaderEl = document.querySelector('.page-header');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = siteHeaderEl.querySelector('.trip-controls__filters');

render(siteNavigationEl, new SiteNavigationView(), RenderPosition.BEFOREEND);
render(filtersEl, new FiltersTripView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter();
tripPresenter.init(waypoints);
