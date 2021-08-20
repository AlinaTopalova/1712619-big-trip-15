import SmartView from './smart.js';
import dayjs from 'dayjs';
import {OFFERS_OPTION, PointsType, Cities, DESTINATIONS} from '../constants.js';

const createTripEditTemplate = (data) => {
  const {
    type,
    city,
    price,
    startDate,
    finishDate,
    offers,
  } = data;

  const getFormatedFullDate = (date) => dayjs(date).format('DD[/]MM[/]YY HH[:]mm');

  const renderDestination = (cityName) => {
    const destinationCity = DESTINATIONS.find((destinationElement) => destinationElement.name === cityName);
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
    const offerOptions = OFFERS_OPTION.find((offerOption) => offerOption.type === typeOffer);

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
          >
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

  const getCitiesInputs = () => {
    const cityInput = Object.keys(Cities).map((cityName) => `<option value=${Cities[cityName]}>${Cities[cityName]}</option>`)
      .join('');
    return `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${cityInput};
    </datalist>
  </div>`;
  };

  const getWaypointTypes = () => (
    Object.keys(PointsType).map((pointType, idx)=> `
      <div class="event__type-item">
        <input
          id="event-type-${PointsType[pointType]}-${idx}"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value=${PointsType[pointType]}

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
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getWaypointTypes()}
          </fieldset>
        </div>
      </div>`
  );

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${getWaypointTypesTemplate(type)}
      ${getCitiesInputs()}
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedFullDate(startDate)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedFullDate(finishDate)}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${renderOffers(type)}
      ${renderDestination(city)}
    </section>
   </form>
   </li>`;
};

export default class TripEdit extends SmartView {
  constructor(waypoint) {
    super();
    this._data = TripEdit.parsePointToData(waypoint);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCancelHandler = this._formCancelHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createTripEditTemplate(this._data);
  }

  static parsePointToData(waypoint) {
    return Object.assign(
      {},
      waypoint,
    );
  }

  static parseDataToPoint(data) {
    Object.assign({}, data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formCancelHandler(evt) {
    evt.preventDefault();
    this._callback.formCancel();
  }

  setFormCancelClickHandler(callback) {
    this._callback.formCancel = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCancelHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
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
    });
  }

  _destinationChangeHandler(evt) {
    this.updateData({
      city: evt.target.value,
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__field-group--destination').addEventListener('change', this._destinationChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCancelClickHandler(this._callback.formCancel);
    this.setFormDeleteClickHandler(this._callback.deleteClick);
  }
}
