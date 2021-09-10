export const STORE_PREFIX = 'bigtrip-localstorage';
export const STORE_VER = 'v15';

export const BACKGROUND_COLORS = {
  'taxi': 'rgba(25, 25, 112, 0.5)',
  'bus': 'rgba(0, 0, 139, 0.5)',
  'train': 'rgba(123, 104, 238, 0.5)',
  'ship': 'rgba(30, 144, 255, 0.5)',
  'drive': 'rgba(0, 191, 255, 0.5)',
  'flight': 'rgba(72, 209, 204, 0.5)',
  'check-in': 'rgba(0, 0, 255, 0.5)',
  'restaurant': 'rgba(70, 130, 180, 0.5)',
  'sightseeing': 'rgba(135, 206, 235, 0.5)',
};

export const FLATPICKER_SETUP = {
  dateFormat: 'd/m/y H:i',
  ['time_24hr']: true,
  enableTime: true,
};

export const MENU_ITEM = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const FiltersType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const UserAction = {
  UPDATE_WAYPOINT: 'UPDATE_WAYPOINT',
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  DELETE_WAYPOINT: 'DELETE_WAYPOINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const PointsType = {
  Taxi:'taxi',
  Bus:'bus',
  Train:'train',
  Ship:'ship',
  Drive:'drive',
  Flight:'flight',
  Checkin:'check-in',
  Sightseeing:'sightseeing',
  Restaurant:'restaurant',
};

export const BLANK_WAYPOINT = {
  price: 0,
  startDate: new Date(),
  finishDate: new Date(),
  type: 'taxi',
  offers: [],
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavorite: false,
};
