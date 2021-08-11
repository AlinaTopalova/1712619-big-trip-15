import AbstractView from './abstract';

//Значение отображаемого текста зависит от выбранного фильтра:
// Everthing – 'Click New Event to create your first point'
// Past — 'There are no past events now';
// Future — 'There are no future events now'

const createNoWaypointTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

export default class NoWaypoint extends AbstractView {
  getTemplate() {
    return createNoWaypointTemplate();
  }
}
