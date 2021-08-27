import AbstractView from './abstract.js';
import { FiltersType } from '../constants.js';

const NoWaypointTextType = {
  [FiltersType.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersType.FUTURE]: 'There are no future events now',
  [FiltersType.PAST]: 'There are no past events now',
};

const createNoWaypointTemplate = (filterType) => {
  const noWaypointTextValue = NoWaypointTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${noWaypointTextValue}
    </p>`
  );
};

export default class NoWaypoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoWaypointTemplate(this._data);
  }
}
