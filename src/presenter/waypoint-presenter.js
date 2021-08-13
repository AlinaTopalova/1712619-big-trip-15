import WaypointView from '../view/waypoint.js';
import TripEditView from '../view/editForm.js';

import { render, replace, remove } from '../utils/render.js';
import { RenderPosition } from '../constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Waypoint {
  constructor(waypointListContainer, changeData, changeMode) {
    this._waypointListContainer = waypointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._waypointComponent = null;
    this._waypointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new WaypointView(waypoint);
    this._waypointEditComponent = new TripEditView(waypoint);
    this._waypointComponent.setEditClickHandler(this._handleEditClick);
    this._waypointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditComponent.setFormCancelHandler(this._handleFormCancelClick);

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this._waypointListContainer, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToWaypoint();
    }
  }

  _replaceWaypointToEdit() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditToWaypoint() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToWaypoint();
    }
  }

  _handleEditClick() {
    this._replaceWaypointToEdit();
  }

  _handleFormCancelClick() {
    this._replaceEditToWaypoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._waypoint,
        {
          isFavorite: !this._waypoint.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(waypoint) {
    this._changeData(waypoint);
    this._replaceEditToWaypoint();
  }
}
