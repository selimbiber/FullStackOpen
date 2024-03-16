/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
const api_key = import.meta.env.VITE_SOME_KEY;

export default function Content({ countries }) {
  const [showCountry, setShowCountry] = useState({});
  const [weatherData, setWeatherData] = useState({ temp: 0, icon: "", condition: "" });
  const country = countries[0];

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}&aqi=no`
        )
        .then((response) => {
          setWeatherData({
            temp: response.data.current.temp_c,
            icon: response.data.current.condition.icon,
            condition: response.data.current.condition.text,
          });
        });
    }
  }, [countries]);

  if (countries.length === 0) return <p>No matches, try another filter</p>;

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <CountryInfo country={country} isShowing={true} />
        <h3>Weather in {country.capital[0]}</h3>
        <p>Temperature: {weatherData.temp} Celcius</p>
        <img
          src={weatherData.icon}
          alt={weatherData.condition}
          style={{ height: 150, width: 150 }}
        />
        <p>Condition: {weatherData.condition}</p>
      </div>
    );
  }

  return (
    <ul>
      {countries.map((country) => {
        const isShowing = showCountry[country.name.common] || false;
        return (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button
              onClick={() =>
                setShowCountry({ ...showCountry, [country.name.common]: !isShowing })
              }
            >
              {isShowing ? "hide" : "show"}
            </button>
            {isShowing && <CountryInfo country={country} isShowing={isShowing} />}
          </li>
        );
      })}
    </ul>
  );
}
