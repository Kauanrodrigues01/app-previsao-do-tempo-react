import './WeatherInformations.css';

function WeatherInformations({ weatherInfo, err }) {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="weather-container">
      {err && <p className="weather-error">{err}</p>}

      {weatherInfo && (
        <div className="weather-card">
          <h2 className="weather-location">
            {weatherInfo.name}, {weatherInfo.sys.country}
          </h2>

          <div className="weather-main">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              alt={weatherInfo.weather[0].description}
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
}

export default WeatherInformations;
