import React, { useState, useEffect } from "react";
import {
  CloudRainWind,
  Droplets,
  Wind,
  Eye,
  ArrowRightLeft,
  CloudOff,
} from "lucide-react";
function WeatherCard() {
  const divisions = [
    { name: "Dhaka", lat: 23.777176, lon: 90.399452 },
    { name: "Chittagong", lat: 22.341900, lon: 91.815536 },
    { name: "Rajshahi", lat: 24.3745, lon: 88.6042 },
    { name: "Khulna", lat: 22.8456, lon: 89.55 },
    { name: "Barisal", lat: 22.701, lon: 90.3652 },
    { name: "Sylhet", lat: 24.8949, lon: 91.8687 },
    { name: "Rangpur", lat: 25.7439, lon: 89.2759 },
    { name: "Mymensingh", lat: 24.7539, lon: 90.4075 },
  ];
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const promises = divisions.map((divisions) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${divisions.lat}&lon=${divisions.lon}&appid=${apiKey}`
          )
        );
        const responses = await Promise.all(promises);
        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok)
              throw new Error(
                `Failed for ${response.url}:${response.statusText}`
              );
            return response.json();
          })
        );
        const weatherByDivision = {};
        divisions.forEach((divisions, index) => {
          weatherByDivision[divisions.name] = data[index];
        });
        setWeatherData(weatherByDivision);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchWeather();
  }, [apiKey]); // Dependencies

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-amber-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center flex justify-center items-center min-h-screen text-red-600 text-xl">
        Error: {error}
      </div>
    );
  }

  if (!weatherData) {
    return <div className="text-center">No data available</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 m-8 sm:m-8 gap-6 place-items-center">
      {divisions.map((division) => {
        const data = weatherData[division.name] || {};
        const temperature = data.main?.temp
          ? (data.main.temp - 273.15).toFixed(1)
          : "N/A";
        const weatherCondition = data.weather?.[0]?.main || "N/A";
        const humidity = data.main?.humidity || "N/A";
        const wSpeed = data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1) : "N/A";
        const pressure = data.main?.pressure || "N/A";
        const visibility = data.visibility? (data.visibility / 1000).toFixed(1) :"N/A";
        const cityName = data.name || "N/A";
        const dataTime = data.dt ? new Date(data.dt * 1000).toLocaleString() : "N/A";
        return (
          <div
            key={divisions.name}
            className="bg-white border-2 border-transparent rounded-2xl w-[400px] h-[800px] p-4 hover:shadow-2xl shadow-sm cursor-pointer"
          >
            <div className="flex flex-col items-center gap-4 pt-2">
              <h1 className="text-3xl font-semibold">{division.name}</h1>
              <p className="border-1 border-transparent bg-gray-200 text-black font-medium rounded-lg px-2">
                {weatherCondition}
              </p>
              <h1 className="text-5xl pt-6 font-medium">{temperature}°C</h1>
              <p className="text-gray-600">Current Temperature</p>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <div className="border-2 border-amber-300 px-6 py-2 h-[80px] w-[150px] rounded-lg">
                <div className="">Humidity</div>
                <div className="font-medium">{humidity} %</div>
              </div>
              <div className="border-2 border-amber-300 px-6 py-2 h-[80px] w-[150px] rounded-lg">
                <div className="">Wind Speed</div>
                <div className="font-medium">{wSpeed} km/h</div>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="border-2 border-amber-300 px-6 py-2 h-[80px] w-[150px] rounded-lg">
                <div className="">Visibility</div>
                <div className="font-medium">{visibility} °</div>
              </div>
              <div className="border-2 border-amber-300 px-6 py-2 h-[80px] w-[150px] rounded-lg">
                <div className="">Pressure</div>
                <div className="font-medium">{pressure} hPa</div>
              </div>
            </div>
            <div className="h-max bg-amber-200 p-4 mr-4 ml-4 rounded-lg mt-8 text-center text-black">
              Time: {dataTime}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherCard;
