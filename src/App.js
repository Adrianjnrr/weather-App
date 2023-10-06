import { useState } from "react";

const dateBuilder = (d) => {
  let Months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let Month = Months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${Month} ${year}`;
};

const KEY = "d20d686f63c6aa94eef2fa1dc974cb77";

export default function App() {
  const [quary, setQuary] = useState("");
  const [weather, setWeather] = useState({});

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${quary}&units=metric&appid=${KEY}`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data));
      setQuary("");
    }
  };

  return (
    <div
      className={
        weather.main ? (weather.main.temp > 16 ? "app " : "app cold") : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="Search-bar"
            placeholder="Search..."
            value={quary}
            onChange={(event) => setQuary(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {weather.weather || weather.base || weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
