import PropTypes from "prop-types";
function HighlightItem({ weatherData }) {
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
    <div className="highlights grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2 mr-5 lg:h-screen">
      {highlightData.map((item, index) => (
        <div key={index} className="p-2">
          <div className="bg-white rounded-lg p-4 flex flex-col h-full dark:bg-zinc-700">
            <h2 className="text-gray-500 dark:text-white">{item.title}</h2>
            <div className="mt-auto">
              <p className="sm:text-4xl text-3xl text-center">{item.value}</p>
            </div>
            <div className="mt-auto">
              <p className="text-xs mt-4">{item.unit}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
HighlightItem.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default HighlightItem;
