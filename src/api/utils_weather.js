import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Функция для запроса погоды 
export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return {
      current: {
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        weather: response.data.weather,
      },
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
