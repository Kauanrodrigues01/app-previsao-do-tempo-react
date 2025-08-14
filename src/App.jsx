import { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import ForecastInformations from './components/ForecastInformations/ForecastInformations';

function App() {
  const inputRef = useRef();
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);
  const [errWeather, setErrWeather] = useState('');
  const [errForecast, setErrForecast] = useState('');

  const apiKey = import.meta.env.VITE_API_KEY;

  // Função para buscar dados climáticos atuais
  async function fetchWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather`;
    return axios.get(url, {
      params: {
        q: cityName,
        appid: apiKey,
        lang: 'pt_br',
        units: 'metric'
      }
    });
  }

  // Função para buscar previsão
  async function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast`;
    return axios.get(url, {
      params: {
        lat,
        lon,
        appid: apiKey,
        lang: 'pt_br',
        units: 'metric'
      }
    });
  }

  async function handleSearchCity() {
    const cityName = inputRef.current.value.trim();

    if (!cityName) {
      setErrWeather('Digite uma cidade.');
      setWeatherInfo(null);
      setForecastInfo(null);
      return;
    }

    try {
      setErrWeather('');
      setErrForecast('');

      // 1️⃣ Buscar clima atual
      const weatherResponse = await fetchWeather(cityName);
      const weatherData = weatherResponse.data;
      setWeatherInfo(weatherData);

      // 2️⃣ Buscar previsão
      try {
        const forecastResponse = await fetchForecast(
          weatherData.coord.lat,
          weatherData.coord.lon
        );
        setForecastInfo(forecastResponse.data);
      } catch (forecastError) {
        console.error("Erro ao buscar previsão:", forecastError);
        setErrForecast('Erro ao carregar previsão.');
        setForecastInfo(null);
      }

    } catch (err) {
      setWeatherInfo(null);
      setForecastInfo(null);
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setErrWeather('Cidade não encontrada. Verifique o nome e tente novamente.');
            break;
          case 401:
            setErrWeather('API Key inválida ou não autorizada.');
            break;
          default:
            setErrWeather(`Erro da API: ${err.response.status}`);
        }
      } else {
        setErrWeather('Erro na requisição. Verifique sua conexão.');
      }
    }
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Digite o nome da cidade"
        onKeyDown={(e) => e.key === 'Enter' && handleSearchCity()}
      />
      <button onClick={handleSearchCity}>Buscar</button>

      <WeatherInformations weatherInfo={weatherInfo} err={errWeather} />
      <ForecastInformations forecastInfo={forecastInfo} err={errForecast} />
      
    </div>
  );
}

export default App;
