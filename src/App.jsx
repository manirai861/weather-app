import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import HighlightItem from "./components/HighlightItem";
import useDarkSide from "./utils/useDarkSide";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [colorTheme, setTheme] = useDarkSide();

  const toggleDarkMode = () => {
    const newTheme = colorTheme === "dark" ? "light" : "dark";
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  const renderThemeChanger = () => {
    return (
      <button onClick={toggleDarkMode}>
        {colorTheme === "dark" ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-900" />
        )}
      </button>
    );
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://spring-weather-app-production.up.railway.app/api/weather?location=${searchQuery}`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  function getTime() {
    const dt = weatherData.dt;
    const timezone = weatherData.timezone;
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds);
    const hours = local_date.getUTCHours().toString().padStart(2, "0");
    const minutes = local_date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = local_date.getUTCSeconds().toString().padStart(2, "0");
    const time = hours + ":" + minutes + ":" + seconds;
    return time;
  }
  function getSunTime(timeType) {
    const timeTimestamp =
      timeType === "sunrise"
        ? weatherData.sys.sunrise * 1000
        : weatherData.sys.sunset * 1000;
    const formattedTime = new Date(timeTimestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  }
  const highlightData = [
    {
      title: "Wind",
      value: weatherData ? weatherData.wind.speed : 10,
      unit: "km/h",
    },
    {
      title: "Humidity",
      value: weatherData ? weatherData.main.humidity : 0,
      unit: "%",
    },
    {
      title: "Visibility",
      value: weatherData ? weatherData.visibility : 1000,
      unit: "m",
    },
    {
      title: "Time",
      value: weatherData ? getTime() : "0:00",
      unit: "Time in local",
    },
    {
      title: "Feels like",
      value: weatherData ? weatherData.main.feels_like : 50,
      unit: "°C",
    },
    {
      title: "Min Temp",
      value: weatherData ? weatherData.main.temp_min : 0,
      unit: "°C",
    },
    {
      title: "Max Temp",
      value: weatherData ? weatherData.main.feels_like : 100,
      unit: "°C",
    },
    {
      title: "Pressure",
      value: weatherData ? weatherData.main.pressure : 99,
      unit: "Atomospheric Pressure",
    },
    {
      title: "Sea Level",
      value: weatherData ? weatherData.main.sea_level : 99,
      unit: "Atmospheric Pressure on sea level",
    },
    {
      title: "Ground Level",
      value: weatherData ? weatherData.main.grnd_level : 99,
      unit: "Atmospheric Pressure on ground level",
    },
    {
      title: "Sunrise",
      value: weatherData ? getSunTime("sunrise") : "0:00",
      unit: "Sunrise Time in your local timezone",
    },
    {
      title: "Sunset",
      value: weatherData ? getSunTime("sunset") : "0:00",
      unit: "Sunset Time in your local timezone",
    },
  ];

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
            {renderThemeChanger()}
          </ul>
        </nav>
        <div className="flex gap-4 mt-2"></div>
        {isLoading ? (
          <Loading />
        ) : (
          <HighlightItem highlightData={highlightData} />
        )}
        <p className="credits text-xs text-center dark:text-white text-gray-700 absolute bottom-6 left-1/2 transform -translate-x-1/2">
          Weather data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}

export default App;
