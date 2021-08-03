export const createTripCostTemplate = (wayPoints) => {
  const {offers, price} = wayPoints;

  const calculateItem = (sum, offer) => (!offers || !(offers.length > 0))
    ? sum + offer.price
    : price + offers.reduce(calculateItem, sum);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${wayPoints.reduce(calculateItem, 0)}</span>
  </p>`;
};
