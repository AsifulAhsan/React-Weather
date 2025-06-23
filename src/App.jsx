import WeatherData from "./components/WeatherData";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="p-6">
      <h1 className="flex justify-center mt-4 font-medium text-4xl">
        React Weather
      </h1>
      <div className="p-2">
        <WeatherCard />
        
      </div>
    </div>
  );
}

export default App;
