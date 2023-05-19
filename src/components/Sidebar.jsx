import { MagnifyingGlassIcon, CloudIcon } from "@heroicons/react/24/outline";
import {
  CloudIcon as SolidCloudIcon,
  MapPinIcon,
  BoltIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Loading from "./Loading";
import PropTypes from "prop-types";

function Sidebar({ isLoading, setSearchQuery, handleSearch, weatherData }) {
  return (
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
              {weatherData ? weatherData.weather[0].description : "description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  weatherData: PropTypes.object,
};

export default Sidebar;
