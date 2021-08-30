import SiteNavigationView from './view/siteNavigation.js';
import StatsView from './view/stats.js';
import TripPresenter from './presenter/tripPresenter.js';
import InfoPresenter from './presenter/infoPresenter.js';
import FilterPresenter from './presenter/filterPresenter.js';
import WaypointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import { remove, render } from './utils/render.js';
import { MENU_ITEM, RenderPosition } from './constants.js';
import { OFFERS_OPTION } from './constants.js';
import { generateWaypoint } from './mock/wayPoint-mock.js';
import OffersModel from './model/offers.js';

const WAYPOINTS_COUNT = 10;

const addWaypointBtn = document.querySelector('.trip-main__event-add-btn');

const offersModel = new OffersModel();
const offers = offersModel.setOffers(OFFERS_OPTION);

const generateWaypoints = (pointsAmount) => (
  Array.from({ length:pointsAmount })
    .map((_, idx) => generateWaypoint(`${idx}`, offers))
);

const waypoints = generateWaypoints(WAYPOINTS_COUNT);

const waypointsModel = new WaypointsModel();
waypointsModel.setWaypoints(waypoints);

const filterModel = new FilterModel();
const pageMain = document.querySelector('.page-body__page-main');
const siteHeaderEl = document.querySelector('.page-header');
const statsContainer = pageMain.querySelector('.page-body__container');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = document.querySelector('.trip-controls__filters');
const siteMenuView = new SiteNavigationView();
let statView = null;

render(siteNavigationEl, siteMenuView, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(waypointsModel, filterModel, offersModel);
const filterPresenter = new FilterPresenter(filtersEl, filterModel, waypointsModel);
tripPresenter.init();
filterPresenter.init();

addWaypointBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
  addWaypointBtn.setAttribute('disabled', 'disabled');
});

const handleSiteMenuChange = (menuItem) => {
  switch (menuItem) {
    case MENU_ITEM.TABLE:
      filterPresenter.enableFilters();
      addWaypointBtn.removeAttribute('disabled', 'disabled');
      remove(statView);
      tripPresenter.init();
      break;
    case MENU_ITEM.STATS:
      filterPresenter.disableFilters();
      statView = new StatsView(waypointsModel.getWaypoints());
      render(statsContainer, statView, RenderPosition.BEFOREEND);
      tripPresenter.destroy();
      addWaypointBtn.setAttribute('disabled', 'disabled');
      break;
  }
};

siteMenuView.setMenuChangeHandler(handleSiteMenuChange);

const infoPresenter = new InfoPresenter(waypoints);
infoPresenter.renderTripInfo();
