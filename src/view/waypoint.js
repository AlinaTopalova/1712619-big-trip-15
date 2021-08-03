import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export const createWaypointTemplate = (wayPoint) => {
  const {
    startDate,
    finishDate,
    type,
    city,
    price,
    offers,
    icon,
    isFavorite,
  } = wayPoint;

  const dayjsStartDate = dayjs(startDate);
  const dayjsFinishDate = dayjs(finishDate);
  const dayjsDuration = dayjs.duration(dayjsFinishDate.diff(dayjsStartDate));

  const getFormatedStartDate = () => dayjsStartDate.format('MMM D');
  const getFormatedStartTime = () => dayjsStartDate.format('HH:mm');
  const getFormatedFinishTime = () => dayjsFinishDate.format('HH:mm');
  const getFormatedDuration = () => {
    let formatTemplate = 'mm[M]';
    if (dayjsDuration.hours()) {
      formatTemplate = 'HH[H] mm[M]';
    }
    if (dayjsDuration.days()) {
      formatTemplate = 'DD[D] HH[H] mm[M]';
    }
    return dayjsDuration.format(formatTemplate);
  };

  const offerItems = offers.map((option) =>`
    <li class="event__offer">
      <span class="event__offer-title">${option.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${option.price}</span>
    </li>
  `).join('');

  const favoriteWayPoint = (isFavorite) ? 'event__favorite-btn--active': '';

  return `<div class="event">
      <time class="event__date" datetime="2019-03-18">${getFormatedStartDate()}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src=${icon} alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${getFormatedStartTime()}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${getFormatedFinishTime()}</time>
        </p>
        <p class="event__duration">${getFormatedDuration()}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerItems}
      </ul>
      <button class="event__favorite-btn ${favoriteWayPoint}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
};


