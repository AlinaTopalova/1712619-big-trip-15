import FilterView from '../view/filters.js';
import { render, replace, remove } from '../utils/render.js';
import { RenderPosition, UpdateType, FiltersType } from '../constants.js';

export default class Filter {
  constructor(filterContainer, filterModel, WaypointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._waypointsModel = WaypointsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if(prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FiltersType.EVERYTHING,
        name: 'everything',
      },
      {
        type: FiltersType.FUTURE,
        name: 'future',
      },
      {
        type: FiltersType.PAST,
        name: 'past',
      },
    ];
  }

  disableFilters() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');

    filters.forEach((filter) => filter.setAttribute('disabled', true));
  }

  enableFilters() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');

    filters.forEach((filter) => filter.removeAttribute('disabled'));
  }
}
