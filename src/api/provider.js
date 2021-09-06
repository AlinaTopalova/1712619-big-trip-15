import WaypointsModel from '../model/points.js';
import { isOnline } from '../utils/common.js';

const getSyncedWaypoints = (items) => items.filter(({success}) => success).map(({payload}) => payload.waypoint);
const createStoreStructure = (items) => items.reduce((acc, current) => Object.assign({}, acc, {[current.id]: current}), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getWaypoints() {
    if (isOnline()) {
      return this._api.getWaypoints()
        .then((waypoints) => {
          const items = createStoreStructure(waypoints.map(WaypointsModel.adaptToServer));
          this._store.setItems(items, 'waypoints');
          return waypoints;
        });
    }
    const storeWaypoints = Object.values(this._store.getItems('waypoints'));
    return Promise.resolve(storeWaypoints.map(WaypointsModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(offers, 'offers');
          return offers;
        });
    }
    const storeOffers = this._store.getItems('offers');
    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(destinations, 'destinations');
          return destinations;
        });
    }
    const storeDestinations = this._store.getItems('destinations');
    return Promise.resolve(storeDestinations);
  }

  updateWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.updateWaypoint(waypoint)
        .then((updateWaypoint) => {
          this._store.setItem('waypoints', updateWaypoint.id, WaypointsModel.adaptToServer(updateWaypoint));
          return updateWaypoint;
        });
    }
    this._store.setItem('waypoints', waypoint.id, WaypointsModel.adaptToServer(Object.assign({}, waypoint)));
    return Promise.resolve(waypoint);
  }

  addWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.addWaypoint(waypoint)
        .then((newWaypoint) => {
          this._store.setItem('waypoints', newWaypoint.id, WaypointsModel.adaptToServer(newWaypoint));
          return newWaypoint;
        });
    }
    return Promise.reject(new Error('Add waypoint failed'));
  }

  deleteWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.deleteWaypoint(waypoint)
        .then(() => this._store.removeItem('waypoints', waypoint.id));
    }
    return Promise.reject(new Error('Delete waypoints failed'));
  }

  sync() {
    if (isOnline()) {
      const storeWaypoints = Object.values(this._store.getItems('waypoints'));

      return this._api.sync(storeWaypoints)
        .then((response) => {
          const createdWaypoints = getSyncedWaypoints(response.created);
          const updatedWaypoints = getSyncedWaypoints(response.updated);

          const items = createStoreStructure([...createdWaypoints, ...updatedWaypoints]);
          this._store.setItems(items, 'waypoints');
        });
    }
    return Promise.reject(new Error('Sync data failed'));
  }
}
