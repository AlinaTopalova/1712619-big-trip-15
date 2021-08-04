import dayjs from 'dayjs';

export const createInfoTripTemplate = (wayPoints) => {
  const startDate = wayPoints[0].startDate;
  const finishDate = wayPoints[wayPoints.length - 1].finishDate;
  const formatedStartDate = dayjs(startDate).format('MMM DD');
  const formatedfinishDate = dayjs(finishDate).format('DD');

  const cities = wayPoints.map((wayPoint) => wayPoint.city);
  const uniqueCities = Array.from(new Set(cities));

  let route = '';

  if (uniqueCities.length > 3) {
    route =
    `
    <h1 class="trip-info__title">${uniqueCities[0]} &mdash; ... &mdash; ${uniqueCities[uniqueCities.length - 1]}</h1>
    `;
  } else {
    route =
    `
    <h1 class="trip-info__title">${uniqueCities[0]} &mdash; ${uniqueCities[1]} &mdash; ${uniqueCities[2]}</h1>
    `;
  }

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    ${route}

      <p class="trip-info__dates">${formatedStartDate} &nbsp;&mdash;&nbsp;${formatedfinishDate}</p>
    </div>
  </section>`;
};

