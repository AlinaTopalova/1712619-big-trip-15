import TripEditView from '../view/editForm.js';
import { remove, render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { UpdateType, UserAction } from '../constants.js';

export default class WaypointNew {
  constructor(waypointListContainer, changeData) {
    this._waypointListContainer = waypointListContainer;
    this._changeData = changeData;
    this._waypointEditView = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offersModel, destinationsModel) {
    if (this._waypointEditView !==null) {
      return;
    }
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._waypointEditView = new TripEditView(undefined, this._getOffers(), this._getDestinations(), false);
    this._waypointEditView.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditView.setFormDeleteClickHandler(this._handleDeleteClick);
    this._waypointEditView.setFormCloseClickHandler(this._handleFormCloseClick);

    render(this._waypointListContainer, this._waypointEditView, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  destroy() {
    if (this._waypointEditView === null) {
      return;
    }
    remove(this._waypointEditView);
    this._waypointEditView = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled', 'disabled');
  }

  setSaving() {
    this._waypointEditView.updateData({
      isSaving: true,
      isDisabled: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._waypointEditView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this._waypointEditView.shake(resetFormState);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
      UserAction.ADD_WAYPOINT,
      UpdateType.MAJOR,
      waypoint,
    );
  }

  _handleFormCloseClick() {
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
