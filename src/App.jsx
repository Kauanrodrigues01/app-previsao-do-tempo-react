import axios from "axios";
import { useCallback, useRef, useState } from "react";
import "./App.css";
import ForecastInformations from "./components/ForecastInformations/ForecastInformations";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";

function App() {
  const inputRef = useRef();
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);
  const [errWeather, setErrWeather] = useState("");
  const [errForecast, setErrForecast] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  // Função para buscar dados climáticos atuais
  const fetchWeather = useCallback(
    async (cityName) => {
      const url = `https://api.openweathermap.org/data/2.5/weather`;
      return axios.get(url, {
        params: {
          q: cityName,
          appid: apiKey,
          lang: "pt_br",
          units: "metric",
        },
      });
    },
    [apiKey]
  );

  // Função para buscar previsão
  const fetchForecast = useCallback(
    async (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/forecast`;
      return axios.get(url, {
        params: {
          lat,
          lon,
          appid: apiKey,
          lang: "pt_br",
          units: "metric",
        },
      });
    },
    [apiKey]
  );

  const handleSearchCity = useCallback(async () => {
    const cityName = inputRef.current.value.trim();

    if (!cityName) {
      setErrWeather("Digite uma cidade.");
      setWeatherInfo(null);
      setForecastInfo(null);
      return;
    }

    try {
      setErrWeather("");
      setErrForecast("");

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
        setErrForecast("Erro ao carregar previsão.");
        setForecastInfo(null);
      }
    } catch (err) {
      setWeatherInfo(null);
      setForecastInfo(null);
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setErrWeather(
              "Cidade não encontrada. Verifique o nome e tente novamente."
            );
            break;
          case 401:
            setErrWeather("API Key inválida ou não autorizada.");
            break;
          default:
            setErrWeather(`Erro da API: ${err.response.status}`);
        }
      } else {
        setErrWeather("Erro na requisição. Verifique sua conexão.");
      }
    }
  }, [fetchWeather, fetchForecast]);

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <label htmlFor="city-input" style={{ display: "none" }}>
        Nome da cidade
      </label>
      <input
        id="city-input"
        ref={inputRef}
        type="text"
        placeholder="Digite o nome da cidade"
        aria-label="Digite o nome da cidade"
        onKeyDown={(e) => e.key === "Enter" && handleSearchCity()}
      />
      <button onClick={handleSearchCity} aria-label="Buscar cidade">
        Buscar
      </button>

      <WeatherInformations weatherInfo={weatherInfo} err={errWeather} />
      <ForecastInformations forecastInfo={forecastInfo} err={errForecast} />
    </div>
  );
}

export default App;
