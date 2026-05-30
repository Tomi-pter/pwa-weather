import axios from "axios";

const API_KEY = "32ae3db2a1654298b8575728263005";
const API_URL = "https://api.weatherapi.com/v1/current.json";

export const fetchWeather = async (location) => {
  return axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: location,
    },
  });
};
