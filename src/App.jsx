import { useState } from "react";
import HighlightItem from "./components/HighlightItem";
import UseDarkSide from "./components/UseDarkSide";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://weather-4syw.onrender.com/api/weather?location=${searchQuery}`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="wrapper flex flex-wrap overflow-x-hidden dark:text-white no-scrollbar">
      <Sidebar
        isLoading={isLoading}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        weatherData={weatherData}
      />
      <div className="main flex-1 w-full min-w-[400px] p-4 bg-gray-100 dark:bg-zinc-800 relative pb-20 overflow-y-scroll overflow-x-clip min-h-screen no-scrollbar">
        <nav className="flex justify-between mr-2">
          <ul className="options flex gap-4 items-center font-semibold text-gray-700 dark:text-white">
            Weather Data
          </ul>
          <ul className="options units flex gap-4 items-center ml-4 p-2 bg-zinc-300 dark:bg-zinc-700 rounded-full">
            <UseDarkSide />
          </ul>
        </nav>
        <div className="flex gap-4 mt-2"></div>
        {isLoading ? <Loading /> : <HighlightItem weatherData={weatherData} />}
        <p className="credits text-xs text-center dark:text-white text-gray-700 absolute bottom-6 left-1/2 transform -translate-x-1/2">
          Weather data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}

export default App;
