import './ForecastInformations.css';

const ForecastInformations = ({ forecastInfo, err }) => {
  const days = forecastInfo?.list.filter((day) =>
    day.dt_txt.includes('12:00:00')
  );

  function getWeekFromTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const weekDay = date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
    return weekDay;
  }

  return (
    <div className="forecast-container">
      {err && <p className="weather-error">{err}</p>}

      {forecastInfo && days?.length > 0 && (
        <div className="forecast-card">
          <h3>Previsão para os próximos 5 dias</h3>
          <div className="infos">
            {days.map((day) => (
              <div className="day-card" key={day.dt}>
                <p>{getWeekFromTimeStamp(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
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
};

export default ForecastInformations;
