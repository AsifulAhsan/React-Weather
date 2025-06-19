import React from "react";
import {
  CloudRainWind,
  Droplets,
  Wind,
  Eye,
  ArrowRightLeft,
  CloudOff,
} from "lucide-react";
function WeatherCard() {
  return (
    <div className="bg-white border-2 border-transparent cursor-pointer hover:shadow-2xl rounded-xl w-100 h-200 p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-semibold">Division</h1>
        <CloudRainWind size={32} className="mt-2" />
      </div>
      <div className=" w-20 border-1 text-center h-auto rounded-lg bg-cyan-600 border-transparent">
        <p className="font-medium text-md text-gray-100">Rainy</p>
      </div>
      <div className="flex flex-col justify-center items-center border-2 mt-8 border-transparent rounded-2xl transition-opacity delay-300 p-2">
        <h1 className="text-5xl text-center font-semibold">22°C</h1>
        <p>Current Temperature</p>
      </div>
      <div className="flex justify-between mt-12">
        <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-blue-100">
          <Droplets />
          <div className="flex flex-col justify-around">
            <p>Humidity</p>
            <p>N/A</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-green-100">
          <Wind />
          <div className="flex flex-col justify-around">
            <p>Wind Speed</p>
            <p>N/A</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-red-100">
          <Eye />
          <div className="flex flex-col justify-around">
            <p>Visibility</p>
            <p>N/A</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly p-2 rounded-lg w-42 h-auto border-2 border-transparent bg-orange-100">
          <ArrowRightLeft />
          <div className="flex flex-col justify-around">
            <p>Direction</p>
            <p>N/A</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 border-2 border-transparent bg-amber-100 p-4 rounded-md justify-between">
        <CloudOff />
        <p>Cloud Cover</p>
        <div className="border-1 border-transparent bg-amber-500 px-1 rounded-lg text-sm">
          <p>N/A</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
