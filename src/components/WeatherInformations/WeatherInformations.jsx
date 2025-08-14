import React from "react";
import "./WeatherInformations.css";
import { capitalize } from "./capitalize";

const WeatherInformations = React.memo(function WeatherInformations({
  weatherInfo,
  err,
}) {
  return (
    <div
      className="weather-container"
      role="region"
      aria-label="Informações do clima atual"
    >
      {err && (
        <p className="weather-error" role="alert">
          {err}
        </p>
      )}

      {weatherInfo && (
        <div className="weather-card">
          <h2 className="weather-location">
            {weatherInfo.name}, {weatherInfo.sys.country}
          </h2>

          <div className="weather-main">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              alt={`Ícone do clima: ${weatherInfo.weather[0].description}`}
              title={weatherInfo.weather[0].description}
              width={60}
              height={60}
            />
            <p className="weather-temp">{weatherInfo.main.temp}°C</p>
          </div>

          <p className="weather-description">
            {capitalize(weatherInfo.weather[0].description)}
          </p>

          <div className="weather-details">
            <p>Sensação térmica: {weatherInfo.main.feels_like}°C</p>
            <p>Umidade: {weatherInfo.main.humidity}%</p>
            <p>Pressão: {weatherInfo.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default WeatherInformations;
