import React, { useEffect, useState } from "react";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const {
    capital,
    area,
    languages,
    flags,
    name,
    capitalInfo: { latlng },
  } = country;

  const [lat, lng] = latlng;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Math.floor(
          lat
        )}&lon=${Math.floor(lng)}.78333333&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [lat, lng]);

  return (
    <div>
      <h2>{name.common}</h2>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h3>languajes: </h3>
      <ul>
        {Object.values(languages).map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={flags.png} alt="" />
      <h2>Wheater in {capital[0]}</h2>
      {Object.keys(weather).length > 0 && (
        <div>
          <p>Temperature {weather.main.temp} Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
