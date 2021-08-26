import { FiltersType } from '../constants.js';

export const filter = {
  [FiltersType.EVERYTHING]: (points) => points.filter((point) => {
    const { startDate, finishDate } = point;
    const dateNow = new Date();

    return new Date(startDate) < dateNow || dateNow < new Date(finishDate);
  }),
  [FiltersType.PAST]: (points) => points.filter((point) => {
    const { finishDate } = point;
    const dateNow = new Date();

    return new Date(finishDate) < dateNow;
  }),
  [FiltersType.FUTURE]: (points) => points.filter((point) => {
    const { startDate } = point;
    const dateNow = new Date();

    return new Date(startDate) > dateNow;
  }),
};
