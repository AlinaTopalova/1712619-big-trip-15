import WaypointView from '../view/waypoint.js';
import TripEditView from '../view/editForm.js';

import { render, replace, remove } from '../utils/render.js';
import { isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';
import { RenderPosition, UserAction, UpdateType } from '../constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Waypoint {
  constructor(waypointListContainer, changeData, changeMode) {
    this._waypointListContainer = waypointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;
    this._offersModel = null;
    this._destinationsModel = null;

    this._waypointView = null;
    this._waypointEditView = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._handleFormDeleteClick = this._handleFormDeleteClick.bind(this);
  }

  init(waypoint, offersModel, destinationsModel) {
    this._waypoint = waypoint;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    const prevWaypointView = this._waypointView;
    const prevWaypointEditView = this._waypointEditView;

    this._waypointView = new WaypointView(waypoint);
    this._waypointEditView = new TripEditView(waypoint, this._getOffers(), this._getDestinations());
    this._waypointView.setEditClickHandler(this._handleEditClick);
    this._waypointView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._waypointEditView.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditView.setFormCloseClickHandler(this._handleFormCloseClick);
    this._waypointEditView.setFormDeleteClickHandler(this._handleFormDeleteClick);

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
      replace(this._waypointView, prevWaypointEditView);
      this._mode = Mode.DEFAULT;
    }

    remove(prevWaypointView);
    remove(prevWaypointEditView);
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
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

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._waypointEditView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    switch (state) {
      case State.SAVING:
        this._waypointEditView.updateData({
          isSaving: true,
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this._waypointEditView.updateData({
          isDeleting: true,
          isDisabled: true,
        });
        break;
      case State.ABORTING:
        this._waypointView.shake(resetFormState);
        this._waypointEditView.shake(resetFormState);
        break;
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
      this._waypointEditView.reset(this._waypoint);
      this._replaceEditToWaypoint();
    }
  }

  _handleEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit task offline');
      return;
    }
    this._replaceWaypointToEdit();
  }

  _handleFormCloseClick() {
    this._waypointEditView.reset(this._waypoint);
    this._replaceEditToWaypoint();
  }

  _handleFormDeleteClick(waypoint) {
    if (!isOnline()) {
      toast('You can\'t delete task offline');
      return;
    }
    this._changeData(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        waypoint,
      ),
    );
  }

  _handleFavoriteClick() {
    if (!isOnline()) {
      toast('You can\'t edit point offline');
      return;
    }
    this._changeData(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._waypoint,
        {
          isFavorite: !this._waypoint.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(update) {
    if (!isOnline()) {
      toast('You can\'t save point offline');
      return;
    }
    this._changeData(
      UserAction.UPDATE_WAYPOINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        update,
      ),
    );
  }
}
