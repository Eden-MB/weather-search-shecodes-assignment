import React, { useState } from "react";
import axios from "axios";
import "./index.css";

export default function App() {
  const [city, setCity] = useState(" ");
  const [display, setDisplay] = useState(false);
  const [weather, setWeather] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function displayWeather(response) {
    setDisplay(true);
    setWeather({
      city: {city},
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.main.wind,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  let form = (
    <div className="newForm">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
        />
        <input type="submit" />
      </form>
    </div>
  );

  if (display) {
    return (
      <div>
        {form}
        <ul className="newForm2">
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <img src={weather.icon} alt={weather.description} />
          
        </ul>
  <p>This project was coded by <strong>Eden</strong> and is a open-sourced on <strong><a href="https://github.com/Eden-MB/react-weather-app-shecodes/tree/main/src" target="_blank">GitHub and hosted on Netlify</a></strong></p>
      </div>
    );
  } else {
    return form;
  }
}
