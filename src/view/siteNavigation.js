import AbstractView from './abstract.js';
import { MENU_ITEM } from '../constants.js';

const createSiteNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MENU_ITEM.TABLE}">${MENU_ITEM.TABLE}</a>
  <a class="trip-tabs__btn" href="#" data-value="${MENU_ITEM.STATS}">${MENU_ITEM.STATS}</a>
</nav>`
);

export default class SiteNavigation extends AbstractView {
  constructor() {
    super();
    this._activeMenuItem = MENU_ITEM.TABLE;
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  getTemplate() {
    return createSiteNavigationTemplate();
  }

  _setMenuItemActive(menuItemEl) {
    const tabs = this.getElement().querySelectorAll('a');

    tabs.forEach((tab) => tab.classList.remove('trip-tabs__btn--active'));
    menuItemEl.classList.add('trip-tabs__btn--active');
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const { value: menuItem } = evt.target.dataset;

    if (!menuItem || menuItem === this._activeMenuItem) {
      return;
    }

    this._activeMenuItem = menuItem;
    this._setMenuItemActive(evt.target);
    this._callback.menuChange(this._activeMenuItem);
  }

  setMenuChangeHandler(callback) {
    this._callback.menuChange = callback;
  }
}
