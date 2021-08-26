import TripEditView from '../view/editForm.js';
import { remove, render } from '../utils/render.js';
import { RenderPosition } from '../constants.js';
import { UpdateType, UserAction } from '../constants.js';
import { v4 as uuidv4 } from 'uuid';

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

  init() {
    if (this._waypointEditView !==null) {
      return;
    }
    this._waypointEditView = new TripEditView(undefined, false);
    this._waypointEditView.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditView.setFormDeleteClickHandler(this._handleDeleteClick);
    this._waypointEditView.setFormCloseClickHandler(this._handleFormCloseClick);

    render(this._waypointListContainer, this._waypointEditView, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._waypointEditView === null) {
      return;
    }
    remove(this._waypointEditView);
    this._waypointEditView = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      Object.assign({id: uuidv4()}, waypoint),
    );
    this.destroy();
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
