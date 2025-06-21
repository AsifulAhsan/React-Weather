import WeatherData from "./components/WeatherData";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div>
      <h1 className="flex justify-center mt-4 font-medium text-4xl">
        React Weather
      </h1>
      <div className="grid grid-cols-1 justify-center items-center min-h-screen sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 m-2">
        <WeatherCard />
        
      </div>
    </div>
  );
}

export default App;
