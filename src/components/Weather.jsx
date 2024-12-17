import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { fetchWeatherData } from './utils/utils_weather'; 

const WeatherContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const WeatherTitle = styled.h2`
  margin-bottom: 20px;
`;

const WeatherInfo = styled.p`
  font-size: 18px;
`;

const DEFAULT_CITY = "Wroclaw"; // Город по умолчанию

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(DEFAULT_CITY);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <WeatherContainer>Загрузка...</WeatherContainer>;
  if (error) return <WeatherContainer>{error}</WeatherContainer>;

  return (
    <WeatherContainer>
      <WeatherTitle>Прогноз погоды</WeatherTitle>
      <WeatherInfo>Температура: {weatherData.current.temp}°C</WeatherInfo>
      <WeatherInfo>Влажность: {weatherData.current.humidity}%</WeatherInfo>
      <WeatherInfo>{weatherData.current.weather[0].description}</WeatherInfo>
    </WeatherContainer>
  );
};

