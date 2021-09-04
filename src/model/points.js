import AbstractObserver from '../utils/abstract-observer.js';

export default class Waypoints extends AbstractObserver {
  constructor() {
    super();
    this._waypoints = [];
  }

  setWaypoints(updateType, waypoints) {
    this._waypoints = waypoints.slice();
    this._notify(updateType);
  }

  getWaypoints() {
    return this._waypoints;
  }

  updateWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      update,
      ...this._waypoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this._waypoints = [
      update,
      ...this._waypoints,
    ];

    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      ...this._waypoints.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(waypoint) {
    const adaptWaypoint = Object.assign(
      {},
      waypoint,
      {
        startDate: waypoint['date_from'] !== null ? new Date(waypoint['date_from']) : waypoint['date_from'],
        finishDate: waypoint['date_to'] !== null ? new Date(waypoint['date_to']) : waypoint['date_to'],
        isFavorite: waypoint['is_favorite'],
        price: waypoint['base_price'],
      },
    );

    delete adaptWaypoint['date_from'];
    delete adaptWaypoint['date_to'];
    delete adaptWaypoint['is_favorite'];
    delete adaptWaypoint['base_price'];

    return adaptWaypoint;
  }

  static adaptToServer(waypoint) {
    const adaptWaypoint = Object.assign(
      {},
      waypoint,
      {
        'date_from':  waypoint.startDate instanceof Date ? waypoint.startDate.toISOString() : null,
        'date_to': waypoint.finishDate instanceof Date ? waypoint.finishDate.toISOString() : null,
        'is_favorite': waypoint.isFavorite,
        'base_price': waypoint.price,
      },
    );

    delete adaptWaypoint.startDate;
    delete adaptWaypoint.finishDate;
    delete adaptWaypoint.isFavorite;
    delete adaptWaypoint.price;

    return adaptWaypoint;
  }
}
