import moment from "moment";

export const getDateOfFilmProduction = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getFilmDuration = (duration) => {
  const hours = duration / 60 ^ 0;
  if (hours) {
    let minutes = duration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${duration}m`;
  }
};
