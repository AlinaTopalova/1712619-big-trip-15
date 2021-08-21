export const START_DATE_GAP = 159200000;
export const FINISH_DATE_GAP_FROM = 3600000;
export const FINISH_DATE_GAP_TO = 14400000;

export const FiltersName = {
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

export const PointsIcon = {
  [PointsType.Taxi]: 'img/icons/taxi.png',
  [PointsType.Bus]: 'img/icons/bus.png',
  [PointsType.Train]: 'img/icons/train.png',
  [PointsType.Ship]: 'img/icons/ship.png',
  [PointsType.Drive]: 'img/icons/drive.png',
  [PointsType.Flight]: 'img/icons/flight.png',
  [PointsType.Checkin]: 'img/icons/check-in.png',
  [PointsType.Sightseeing]: 'img/icons/sightseeing.png',
  [PointsType.Restaurant]: 'img/icons/restaurant.png',
};

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

export const OFFERS_OPTION = [
  {
    'type': PointsType.Taxi,
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      }, {
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'title': 'Choose driver',
        'price': 40,
      }, {
        'title': 'Choose eat',
        'price': 200,
      },
      {
        'title': 'Choose music',
        'price': 10,
      }, {
        'title': 'Choose drinks',
        'price': 130,
      },
    ],
  },
  {
    'type': PointsType.Bus,
    'offers': [
      {
        'title': 'Travel by bus',
        'price': 40,
      }, {
        'title': 'Choose the radio station',
        'price': 80,
      },
    ],
  },
  {
    'type': PointsType.Train,
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 60,
      }, {
        'title': 'Choose seats',
        'price': 35,
      },
    ],
  },
  {
    'type': PointsType.Ship,
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
    ],
  },
  {
    'type': PointsType.Drive,
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 50,
      },
      {
        'title': 'Upgrade to a business class',
        'price': 50,
      },
    ],
  },
  {
    'type': PointsType.Flight,
    'offers': [
      {
        'title': 'Add luggage',
        'price': 10,
      },
    ],
  },
  {
    'type': PointsType.Checkin,
    'offers': [
      {
        'title': 'Add luggage',
        'price': 10,
      },
    ],
  },
  {
    'type': PointsType.Sightseeing,
    'offers': [],
  },
  {
    'type': PointsType.Restaurant,
    'offers': [
      {
        'title': 'Add meal',
        'price': 40,
      },
      {
        'title': 'Add good meal',
        'price': 80,
      },
      {
        'title': 'Add  bad meal',
        'price': 10,
      },
    ],
  },
];

export const Cities = {
  AMSTERDAM:'Amsterdam',
  WASHINGTON:'Washington',
  BERLIN:'Berlin',
  VIENNA:'Vienna',
  PRAGUE:'Prague',
  PARIS:'Paris',
};

export const DESTINATIONS = [
  {
    'name': 'Amsterdam',
    'description': 'Amsterdam. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Amsterdam zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Amsterdam street market',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Amsterdam parliament building',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Amsterdam embankment',
      },
    ],
  },

  {
    'name': 'Washington',
    'description': 'Washington, cras aliquet varius magna, non porta ligula feugiat eget Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Washington zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Washington street market',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Washington parliament building',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Washington embankment',
      },
    ],
  },
  {
    'name': 'Berlin',
    'description': 'Berlin, cras aliquet varius magna, non porta ligula feugiat eget Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Berlin zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Berlin street market',
      },
    ],
  },

  {
    'name': 'Vienna',
    'description': 'Vienna, cras aliquet varius magna, non porta ligula feugiat eget Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Vienna zoo',
      },
    ],
  },
  {
    'name': 'Prague',
    'description': 'Prague, with a beautiful old town.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Prague zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Prague zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Prague street market',
      },
    ],
  },
  {
    'name': 'Paris',
    'description': 'Paris. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Paris zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Paris zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Paris street market',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Paris zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Paris zoo',
      },
    ],
  },
  {
    'name': 'Geneva',
    'description': 'Geneva. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat.',
    'pictures': [
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Geneva zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Geneva zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Geneva street market',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Geneva zoo',
      },
      {
        'src': `http://picsum.photos/248/152?r=${Math.random()}`,
        'description': 'Geneva zoo',
      },
    ],
  },
];

