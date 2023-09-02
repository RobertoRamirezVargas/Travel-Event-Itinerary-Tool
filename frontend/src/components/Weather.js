import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiWindy,
  WiThunderstorm,
} from "react-icons/wi";

const WeatherContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const LocationInput = styled.input`
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 60%;
  margin-bottom: 1rem;
`;

const WeatherIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #007bff;
  height: 4rem;
`;

const WeatherDescription = styled.p`
  font-size: 1.5rem;
  color: #555;
`;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("Montreal");

  useEffect(() => {
    fetchWeather(cityName);
  }, [cityName]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`/weather?cityName=${cityName}`);
      setWeatherData(response.data);
    } catch (error) {}
  };

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  const weatherIconMap = {
    Clear: WiDaySunny,
    Clouds: WiCloudy,
    Rain: WiRain,
    Snow: WiSnow,
    Drizzle: WiRain,
    Thunderstorm: WiThunderstorm,
    Mist: WiWindy,
    Smoke: WiWindy,
    Haze: WiWindy,
    Dust: WiWindy,
    Fog: WiWindy,
    Sand: WiWindy,
    Ash: WiWindy,
    Squall: WiWindy,
    Tornado: WiWindy,
  };

  const WeatherIconComponent =
    weatherIconMap[weatherData.weather[0].main] || WiDaySunny;

  return (
    <WeatherContainer>
      <h2>Weather Forecast</h2>
      <br />
      <LocationInput
        type="text"
        placeholder="Enter a location"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <WeatherIcon>
        <WeatherIconComponent />
      </WeatherIcon>
      <WeatherDescription>
        {weatherData.weather[0].description}
      </WeatherDescription>
      <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </WeatherContainer>
  );
};

export default Weather;
