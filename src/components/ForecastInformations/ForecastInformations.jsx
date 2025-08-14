import React from "react";
import './ForecastInformations.css';
import { useWeekday } from "./useWeekday";

const ForecastInformations = React.memo(function ForecastInformations({
  forecastInfo,
  err,
}) {
  const getWeekFromTimeStamp = useWeekday();
  const days = forecastInfo?.list.filter((day) =>
    day.dt_txt.includes("12:00:00")
  );

  return (
    <div
      className="forecast-container"
      role="region"
      aria-label="Previsão do tempo para os próximos 5 dias"
    >
      {err && (
        <p className="weather-error" role="alert">
          {err}
        </p>
      )}

      {forecastInfo && days?.length > 0 && (
        <div className="forecast-card">
          <h3>Previsão para os próximos 5 dias</h3>
          <div className="infos">
            {days.map((day) => (
              <div className="day-card" key={day.dt}>
                <p>{getWeekFromTimeStamp(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={`Ícone de clima: ${day.weather[0].description}`}
                  title={day.weather[0].description}
                  width={50}
                  height={50}
                />
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ForecastInformations;
