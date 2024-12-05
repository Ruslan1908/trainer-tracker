import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Функция для запроса погоды по координатам
export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
