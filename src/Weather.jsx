import { useEffect, useState } from 'react'; 
import { styled } from 'styled-components';
import axios from 'axios';

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

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lat = 33.44; 
  const lon = -94.04; 
  const apiKey = '5fdd93652c06870916b3a6ccf6b88aca'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`  // Добавлен параметр units=metric
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon, apiKey]);

  if (loading) return <WeatherContainer>Загрузка...</WeatherContainer>;
  if (error) return <WeatherContainer>{error}</WeatherContainer>;

  return (
    <WeatherContainer>
      <WeatherTitle>Прогноз погоды</WeatherTitle>
      <WeatherInfo>Температура: {weatherData.current.temp}°C</WeatherInfo>  {/* Температура теперь в Цельсиях */}
      <WeatherInfo>Влажность: {weatherData.current.humidity}%</WeatherInfo>
      <WeatherInfo>{weatherData.current.weather[0].description}</WeatherInfo>
    </WeatherContainer>
  );
};
