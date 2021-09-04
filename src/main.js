import SiteNavigationView from './view/siteNavigation.js';
import StatsView from './view/stats.js';
import TripPresenter from './presenter/tripPresenter.js';
//import InfoPresenter from './presenter/infoPresenter.js';
import FilterPresenter from './presenter/filterPresenter.js';
import WaypointsModel from './model/points.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destination.js';
import FilterModel from './model/filter.js';
import { remove, render } from './utils/render.js';
import { MENU_ITEM, RenderPosition, UpdateType } from './constants.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic kO5ddh4d56pzm56i5l15sd777';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const addWaypointBtn = document.querySelector('.trip-main__event-add-btn');

const api = new Api(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const waypointsModel = new WaypointsModel();
const filterModel = new FilterModel();

const pageMain = document.querySelector('.page-body__page-main');
const siteHeaderEl = document.querySelector('.page-header');
const statsContainer = pageMain.querySelector('.page-body__container');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = document.querySelector('.trip-controls__filters');
const siteMenuView = new SiteNavigationView();
let statView = null;

const tripPresenter = new TripPresenter(waypointsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(filtersEl, filterModel, waypointsModel);
tripPresenter.init();
filterPresenter.init();


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

addWaypointBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
  addWaypointBtn.setAttribute('disabled', 'disabled');
});

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getWaypoints(),
]).then((values) => {
  offersModel.setOffers(values[0]);
  console.log('values[2]', values[2]);
  destinationsModel.setDestinations(values[1]);
  waypointsModel.setWaypoints(UpdateType.INIT, values[2]);
  render(siteNavigationEl, siteMenuView, RenderPosition.BEFOREEND);
  siteMenuView.setMenuChangeHandler(handleSiteMenuChange);
}).catch(() => {
  waypointsModel.setWaypoints(UpdateType.INIT, []);
  render(siteNavigationEl, siteMenuView, RenderPosition.BEFOREEND);
  siteMenuView.setMenuChangeHandler(handleSiteMenuChange);
});

// const infoPresenter = new InfoPresenter(waypoints);
// infoPresenter.renderTripInfo();
