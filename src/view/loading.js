import AbstractView from './abstract.js';

const createLoadingWaypointsTemplate = () => (
  `<p class="trip-events__msg">
    Loading...
  </p>`
);

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingWaypointsTemplate();
  }
}
