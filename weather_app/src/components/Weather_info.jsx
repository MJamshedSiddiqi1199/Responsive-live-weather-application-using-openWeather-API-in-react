import { useState, useEffect } from "react";
import axios from "axios";

import sun1 from "../assets/sun1.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import drizzle from "../assets/drizzle.png";
import storm from "../assets/storm.png";
import mist from "../assets/mist.png";

const weatherIcons = {
  Clear: sun1,
  Clouds: cloud,
  Rain: rain,
  Snow: snow,
  Drizzle: drizzle,
  Thunderstorm: storm,
  Mist: mist,
  Smoke: mist,
  Haze: mist,
};

// eslint-disable-next-line react/prop-types
const WeatherCard = ({ city, temperature, weatherDescription, forecast }) => {
  const getNextDays = (index) => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + index);
    return nextDay.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-10">
      <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-lg z-10 absolute">
        <div className="text-center p-10 mb-32 md:ml-56 md:mr-56 ">
          <div className="text-6xl ml-20">
            <img
              src={weatherIcons[weatherDescription]}
              alt={weatherDescription}
              className="w-16 h-16 animate-bounce"
            />
          </div>
          <h2 className="text-4xl font-bold mt-2">{city}</h2>
          <p className="text-2xl mt-1">Temperature: {temperature}°C</p>
          <p className="text-lg mt-1">{weatherDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-80">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="text-center bg-white bg-opacity-90 md:p-4 p-2 rounded-3xl shadow-sm z-50"
          >
            <div className="md:text-2xl text-1xl ml-8 pt-4">
              <img
                src={day.icon}
                alt={day.day}
                className="w-8 h-8 animate-bounce"
              />
            </div>
            <p className="text-lg font-semibold mt-2">{getNextDays(index)}</p>
            <p className="text-md">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const WeatherInfo = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = "Use your api key here";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        setWeatherData({
          city: response.data.name,
          temperature: response.data.main.temp,
          weatherDescription: response.data.weather[0].main,
          forecast: forecastResponse.data.list.slice(0, 4).map((item) => ({
            day: new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            temp: item.main.temp,
            icon: weatherIcons[item.weather[0].main],
          })),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return weatherData ? (
    <WeatherCard
      city={weatherData.city}
      temperature={weatherData.temperature}
      weatherDescription={weatherData.weatherDescription}
      forecast={weatherData.forecast}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default WeatherInfo;
