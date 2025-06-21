// src/components/WeatherChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const WeatherChart = ({ data = [] }) => {
  // Ensure data is an array and map to the correct structure
  const processedData = Array.isArray(data)
    ? data.map((item) => ({
        division: item.division,
        temperature: item.temperature || 0, // Fallback to 0 if undefined
      }))
    : [];

  return (
    <BarChart width={600} height={300} data={processedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="division" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />
    </BarChart>
  );
};

export default WeatherChart;