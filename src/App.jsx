import { useState } from "react";
import {
  MagnifyingGlassIcon,
  CloudIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import {
  CloudIcon as SolidCloudIcon,
  MapPinIcon,
  BoltIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

import useDarkSide from "./utils/useDarkSide";
import Loading from "./components/Loading";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [colorTheme, setTheme] = useDarkSide();

  const [darkmode, Setdarkmode] = useState(true);
  const toggleDarkMode = () => {
    if (darkmode === false) {
      setTheme("dark");
      Setdarkmode(true);
    } else {
      setTheme("light");
      Setdarkmode(false);
    }
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
  function getSunriseTime() {
    const sunriseTimestamp = weatherData.sys.sunrise * 1000;
    const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return sunriseTime;
  }

  function getSunsetTime() {
    const sunsetTimestamp = weatherData.sys.sunset * 1000;
    const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return sunsetTime;
  }

  const renderThemeChanger = () => {
    if (darkmode) {
      return (
        <SunIcon
          className="w-6 h-6  text-yellow-500 "
          role="button"
          onClick={() => toggleDarkMode()}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-6 h-6  text-gray-900 "
          role="button"
          onClick={() => toggleDarkMode()}
        />
      );
    }
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

  return (
    <div className="wrapper flex flex-wrap overflow-x-hidden dark:text-white">
      <div className="sidebar bg-white dark:bg-zinc-900 p-4 flex flex-col justify-between w-full sm:w-1/5 sticky top-0 h-screen sm:h-auto">
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <form
              className="search relative mb-6 mt-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                id="query"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 border border-gray-300 dark:border-zinc-300 rounded-md bg-inherit rounded-l pl-3 text-sm text-gray-600 dark:text-white"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 h-10 w-10 bg-blue-400 text-sm rounded-r"
              >
                <MagnifyingGlassIcon className="ml-2 w-5 h-5 text-white" />
              </button>
            </form>
          )}

          <div className="weather-icon">
            <CloudIcon className="w-5 h-5 dark:text-white" />
          </div>
          <div className="temperature flex items-center">
            <h1 className="text-7xl font-thin leading-none dark:text-white">
              {weatherData ? weatherData.main.temp : 0}
            </h1>
            <span className="temp-unit text-4xl ml-1 mt-[-10px] dark:text-white">
              &deg;C
            </span>
          </div>
          <div className="date-time">
            <p id="date-time" className="text-gray-700 dark:text-gray-300">
              {`${new Date().toLocaleString()}`}
            </p>
          </div>

          <hr className="h-px my-8 border-gray-300 border-1 dark:border-zinc-500" />
          <div className="condition-rain text-xs capitalize">
            <div className="condition flex items-center mb-4">
              <SolidCloudIcon className="w-5 h-5 dark:text-white" />
              <p id="condition" className="ml-2  dark:text-white">
                {weatherData ? weatherData.clouds.all : "clouds"}
              </p>
            </div>
            <div className="rain flex items-center mb-4">
              <BoltIcon className="w-5 h-5" />
              <p id="gust" className="ml-2">
                {weatherData ? weatherData.wind.gust : 0}
              </p>
            </div>
            <div className="map flex items-center mb-4">
              <MapPinIcon className="w-5 h-5" />
              <p id="location" className="ml-2">
                {weatherData ? weatherData.name : "Location"}
              </p>
            </div>
            <div className="description flex items-center mb-4">
              <InformationCircleIcon className="w-5 h-5" />
              <p id="location" className="ml-2">
                {weatherData
                  ? weatherData.weather[0].description
                  : "description"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main flex-1 w-full min-w-[400px] p-4 bg-gray-100 dark:bg-zinc-800 relative pb-20 overflow-y-scroll overflow-x-clip min-h-screen">
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
          <div className="highlights grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2 mr-5 lg:h-screen ">
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Wind</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {" "}
                    {weatherData ? weatherData.wind.speed : "10"} km/h
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Wind Speed</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Humidity</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.humidity : "0"}%
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Humidity Level</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Visibility</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.visibility : "1000"} m
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Visibility Range</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Time</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? getTime() : "0:00"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Time in local</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Feels like</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.feels_like : "50"}&deg;C
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Temperature feels like</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Min Temp</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.temp_min : "0"}&deg;C
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Minimum temperature</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Max Temp</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.feels_like : "100"}&deg;C
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Maximum Temperature</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Pressure</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.pressure : "99"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">Atomospheric Pressure</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Sea Level</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.sea_level : "99"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">
                    Atmospheric Pressure on sea level
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Ground Level</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? weatherData.main.grnd_level : "99"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">
                    Atmospheric Pressure on ground level
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Sunrise</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? getSunriseTime() : "0:00"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">
                    Sunrise Time in your local timezone
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
                <h2 className="text-gray-500 dark:text-white">Sunset</h2>
                <div className="mt-auto">
                  <p className="sm:text-4xl text-3xl text-center">
                    {weatherData ? getSunsetTime() : "0:00"}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs mt-4">
                    Sunset Time in your local timezone
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="credits text-xs text-center dark:text-white text-gray-700 absolute bottom-6 left-1/2 transform -translate-x-1/2">
          Weather data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}

export default App;
