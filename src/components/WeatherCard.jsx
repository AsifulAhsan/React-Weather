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
    { name: "Dhaka", lat: 23.8103, lon: 90.4125 },
    { name: "Chittagong", lat: 22.3569, lon: 91.7832 },
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
    <div className="container mx-auto px-4 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-150 md:w-300">
        {divisions.map((division) => {
          const data = weatherData[division.name] || {};
          const temperature = data.main?.temp ? (data.main.temp - 273.15).toFixed(1) : "N/A";
          const windSpeed = data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1) : "N/A";
          const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : "N/A";

          return (
            <div
              key={division.name}
              className="bg-white border-2 border-transparent cursor-pointer hover:shadow-2xl shadow-md rounded-xl w-auto h-250 p-4"
            >
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-semibold">{division.name}</h1>
                <CloudRainWind size={32} className="mt-2" />
              </div>
              <div className="w-20 text-center h-auto rounded-lg bg-cyan-600 border-transparent">
                <p className="font-medium text-md text-gray-100">{data.weather?.[0]?.main || "Rainy"}</p>
              </div>
              <div className="flex flex-col justify-center items-center border-2 mt-8 border-transparent rounded-2xl transition-opacity delay-300 p-2">
                <h1 className="text-5xl text-center font-semibold">{temperature}°C</h1>
                <p>Current Temperature</p>
              </div>
              <div className="flex justify-between mt-12">
                <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-blue-100">
                  <Droplets />
                  <div className="flex flex-col justify-around">
                    <p>Humidity</p>
                    <p>{data.main?.humidity || "N/A"}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-green-100">
                  <Wind />
                  <div className="flex flex-col justify-around">
                    <p>Wind Speed</p>
                    <p>{windSpeed} km/h</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-red-100">
                  <Eye />
                  <div className="flex flex-col justify-around">
                    <p>Visibility</p>
                    <p>{visibility} km</p>
                  </div>
                </div>
                <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-orange-100">
                  <ArrowRightLeft />
                  <div className="flex flex-col justify-around">
                    <p>Direction</p>
                    <p>{data.wind?.deg || "N/A"}°</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4 border-2 border-transparent bg-amber-100 p-4 rounded-md justify-between">
                <CloudOff />
                <p>Cloud Cover</p>
                <div className="border-1 border-transparent bg-amber-500 px-1 rounded-lg text-sm">
                  <p>{data.clouds?.all || "N/A"}%</p>
                </div>
              </div>
              <div className="mt-6">{/* Reserved for charts in future */}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherCard;
