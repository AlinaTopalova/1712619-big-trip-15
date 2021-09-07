import SiteNavigationView from './view/siteNavigation.js';
import StatsView from './view/stats.js';
import TripPresenter from './presenter/tripPresenter.js';
import InfoPresenter from './presenter/infoPresenter.js';
import FilterPresenter from './presenter/filterPresenter.js';
import WaypointsModel from './model/points.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destination.js';
import FilterModel from './model/filter.js';
import { remove, render } from './utils/render.js';
import { MENU_ITEM, RenderPosition, UpdateType } from './constants.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic kO5ddh4d56pzm56535i5l15sd777';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(window.localStorage);
const apiWithProvider = new Provider(api, store);

const addWaypointBtn = document.querySelector('.trip-main__event-add-btn');
const pageMain = document.querySelector('.page-body__page-main');
const siteHeaderEl = document.querySelector('.page-header');
const statsContainer = pageMain.querySelector('.page-body__container');
const siteNavigationEl = siteHeaderEl.querySelector('.trip-controls__navigation');
const filtersEl = document.querySelector('.trip-controls__filters');

const siteMenuView = new SiteNavigationView();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const waypointsModel = new WaypointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(waypointsModel, filterModel, offersModel, destinationsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(filtersEl, filterModel, waypointsModel);
const infoPresenter = new InfoPresenter(waypointsModel);
let statView = null;

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

const getInitialData = () => {
  Promise.all([
    apiWithProvider.getOffers(),
    apiWithProvider.getDestinations(),
    apiWithProvider.getWaypoints(),
  ]).then(([offers, destinations, waypoints]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    waypointsModel.setWaypoints(UpdateType.INIT, waypoints);
    render(siteNavigationEl, siteMenuView, RenderPosition.BEFOREEND);
    siteMenuView.setMenuChangeHandler(handleSiteMenuChange);
  }).catch(() => {
    waypointsModel.setWaypoints(UpdateType.INIT, []);
    render(siteNavigationEl, siteMenuView, RenderPosition.BEFOREEND);
    siteMenuView.setMenuChangeHandler(handleSiteMenuChange);
  });
};

getInitialData();
tripPresenter.init();
filterPresenter.init();
infoPresenter.init();

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});

