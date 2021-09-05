import WaypointsModel from './model/points.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then(Api.toJSON);
  }

  getWaypoints() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((waypoints) => waypoints.map(WaypointsModel.adaptToClient));
  }

  updateWaypoint(waypoint) {
    return this._load({
      url: `points/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(WaypointsModel.adaptToClient);
  }

  addWaypoint(waypoint) {
    return this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(WaypointsModel.adaptToClient);
  }

  deleteWaypoint(waypoint) {
    return this._load({
      url: `points/${waypoint.id}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
