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

    this._waypointView = null;
    this._waypointEditView = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormCancelClick = this._handleFormCancelClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointView = this._waypointView;
    const prevWaypointEditView = this._waypointEditView;

    this._waypointView = new WaypointView(waypoint);
    this._waypointEditView = new TripEditView(waypoint);
    this._waypointView.setEditClickHandler(this._handleEditClick);
    this._waypointView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditView.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditView.setFormCancelClickHandler(this._handleFormCancelClick);
    //this._waypointEditView.setFormDeleteClickHandler(this._handleEditFormDelete);

    if (prevWaypointView === null || prevWaypointEditView === null) {
      render(
        this._waypointListContainer,
        this._waypointView,
        RenderPosition.BEFOREEND,
      );
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointView, prevWaypointView);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointEditView, prevWaypointEditView);
    }

    remove(prevWaypointView);
    remove(prevWaypointEditView);
  }

  destroy() {
    remove(this._waypointView);
    remove(this._waypointEditView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToWaypoint();
    }
  }

  _replaceWaypointToEdit() {
    replace(this._waypointEditView, this._waypointView);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditToWaypoint() {
    replace(this._waypointView, this._waypointEditView);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._waypointEditView.resetView(this._waypoint);
      this._replaceEditToWaypoint();
    }
  }

  _handleEditClick() {
    this._replaceWaypointToEdit();
  }

  _handleFormCancelClick() {
    this._replaceEditToWaypoint();
  }

  _handleEditFormDelete() {
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
