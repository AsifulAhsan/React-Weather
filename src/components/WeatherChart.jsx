import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Sample weather data
const weatherData = [
  { day: 'Mon', temperature: 22 },
  { day: 'Tue', temperature: 25 },
  { day: 'Wed', temperature: 20 },
  { day: 'Thu', temperature: 23 },
  { day: 'Fri', temperature: 27 },
  { day: 'Sat', temperature: 24 },
  { day: 'Sun', temperature: 21 },
];

const WeatherChart = () => {
  return (
    <div className="flex flex-col justify-center mt-4">
      <h1 className='text-center font-semibold text-lg'>Mock Weekly Temperature</h1>
      <LineChart
        width={350}
        height={150}
        data={weatherData}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `${value}°C`} />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={{ r: 4 }} />
      </LineChart>
    </div>
  );
};

export default WeatherChart;