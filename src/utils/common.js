import moment from "moment";

export const getDateOfFilmProduction = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};
