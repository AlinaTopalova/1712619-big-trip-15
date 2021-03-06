import SmartView from './smart.js';
import dayjs from 'dayjs';
import { PointsType} from '../constants.js';
import { BLANK_WAYPOINT, FLATPICKER_SETUP } from '../constants.js';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTripEditTemplate = (data, isEdit, tripOffersData, destinationsData) => {
  const {
    type,
    destination,
    price,
    startDate,
    finishDate,
    offers,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const getFormattedFullDate = (date) => dayjs(date).format('DD[/]MM[/]YY HH[:]mm');

  const getStatusOfCancelButton = () => {
    switch (true) {
      case isDeleting:
        return 'Deleting...';
      case isEdit:
        return 'Delete';
      default:
        return 'Cancel';
    }
  };

  const getWaypointTypes = (tripType) => (
    Object.keys(PointsType).map((pointType, idx)=> `
      <div class="event__type-item">
        <input
          id="event-type-${PointsType[pointType]}-${idx}"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value=${PointsType[pointType]}
          ${(tripType === PointsType[pointType]) ? 'checked' : ''}

        >
        <label
          class="event__type-label  event__type-label--${PointsType[pointType]}"
          for="event-type-${PointsType[pointType]}-${idx}"
        >
          ${pointType}
        </label>
      </div>`).join('')
  );

  const getWaypointTypesTemplate = (tripType) => (
    `<div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getWaypointTypes(tripType)}
          </fieldset>
        </div>
      </div>`
  );

  const getCitiesList = (cityValue) => {
    const citiesList = destinationsData.map((destinationElement) => `<option value=${destinationElement.name}
    ${(cityValue === destinationElement.name) ? 'selected' : ''}></option>`).join('');
    return `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" onkeyup="this.value=''" ${isDisabled ? 'disabled' : ''}>
    <datalist id="destination-list-1">
    ${citiesList};
    </datalist>
  </div>`;
  };

  const renderDestination = (cityName) => {
    const destinationCity = destinationsData.find((destinationsElement) => destinationsElement.name === cityName);
    if (!destinationCity) {
      return '';
    }
    return `
    <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationCity.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationCity.pictures.map((picture) => `
            <img class="event__photo" src=${picture.src} alt=${picture.description}>
            `).join('')}
          </div>
        </div>
      </section>`;
  };

  const renderOffers = (typeOffer) => {
    const offerOptions = tripOffersData.find((offerOption) => offerOption.type === typeOffer);

    if (offerOptions.offers.length === 0) {
      return '';
    }

    const getOfferSelectors = () => (
      offerOptions.offers.map((offer, idx) => {
        const isChecked = offers.some((waypointOffer) => offer.title === waypointOffer.title);
        return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${idx}"
            type="checkbox"
            name="event-offer-${idx}"
            ${isChecked ? 'checked' : ''}
            data-title = "${offer.title}"
            data-price = "${offer.price}"
            ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="event-offer-${idx}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;
      }).join('')
    );

    return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${getOfferSelectors()}
      </div>
    </section>`;
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getWaypointTypesTemplate(type)}
      ${getCitiesList(destination.name)}
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedFullDate(startDate)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedFullDate(finishDate)}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${price} pattern="[0-9]{10}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${ getStatusOfCancelButton() }</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${renderOffers(type)}
      ${renderDestination(destination.name)}
    </section>
   </form>
   </li>`;
};

export default class TripEdit extends SmartView {
  constructor(waypoint = BLANK_WAYPOINT, offersData, destinationsData, isEdit = true) {
    super();
    this._data = TripEdit.parsePointToData(waypoint);
    this._datepickerStart = null;
    this._datepickerFinish = null;
    this._isEdit = isEdit;
    this._offersData = offersData;
    this._destinationsData = destinationsData;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler  = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._datepickerStartChangeHandler = this._datepickerStartChangeHandler.bind(this);
    this._datepickerFinishChangeHandler = this._datepickerFinishChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerFinish();
  }

  removeElement() {
    super.removeElement();
    this._resetDatePicker();
  }

  _resetDatePicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
  }

  reset(waypoint) {
    this.updateData(
      TripEdit.parsePointToData(waypoint),
    );
  }

  getTemplate() {
    return createTripEditTemplate(this._data, this._isEdit, this._offersData, this._destinationsData);
  }

  static parsePointToData(waypoint) {
    return Object.assign(
      {},
      waypoint,
      {
        isSaving: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    delete data.isSaving;
    return data;
  }

  _setDatepickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._data.startDate) {
      this._datepickerStart = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        Object.assign(
          {},
          FLATPICKER_SETUP,
          {
            onChange: this._datepickerStartChangeHandler,
          },
        ),
      );
    }
  }

  _datepickerStartChangeHandler([userDate]) {
    this.updateData({
      startDate: userDate,
    });
  }

  _setDatepickerFinish() {
    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
    if (this._data.finishDate) {
      this._datepickerFinish = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        Object.assign(
          {},
          FLATPICKER_SETUP,
          {
            minDate: this._data.startDate,
            onChange: this._datepickerFinishChangeHandler,
          },
        ),
      );
    }
  }

  _datepickerFinishChangeHandler([userDate]) {
    this.updateData({
      finishDate: userDate,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    if (!isNaN(evt.target.value) && evt.target.value >= 0) {
      this.updateData({
        price: Number(evt.target.value),
      }, true);
      return;
    }
    this.updateData({
      price: 0,
    });
  }

  setFormPriceInputHandler(callback) {
    this._callback.formPriceInput = callback;
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceInputHandler);
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formClose();
  }

  setFormCloseClickHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(TripEdit.parseDataToPoint(this._data));
  }

  setFormDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.classList.contains('event__type-toggle')) {
      return;
    }
    this.updateData({
      type: evt.target.value,
      [evt.target.value]: evt.target.checked,
      offers: [],
    });
  }

  _offersChangeHandler(evt) {
    const { price, title } = evt.target.dataset;
    this.updateData({
      offers: evt.target.checked
        ? [...this._data.offers, {title, price: Number(price)}]
        : [...this._data.offers.filter((offer) => offer.title !== title)],
    });
  }

  _destinationChangeHandler(evt) {
    const newCity = this._destinationsData.find((destinationsElement) => destinationsElement.name === evt.target.value);
    this.updateData({
      destination: {
        name: newCity.name,
        description: newCity.description,
        pictures: newCity.pictures,
      },
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceInputHandler);
    this.getElement().querySelector('.event__field-group--destination').addEventListener('change', this._destinationChangeHandler);
    const blockOffers = this.getElement().querySelector('.event__section--offers');
    if (!blockOffers) {
      return;
    }
    blockOffers.addEventListener('change', this._offersChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerFinish();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseClickHandler(this._callback.formClose);
    this.setFormDeleteClickHandler(this._callback.deleteClick);
    this.setFormPriceInputHandler(this._callback.formPriceInput);
  }
}
