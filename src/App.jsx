import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://weather-4syw.onrender.com/api/weather?location=${searchQuery}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Weather App</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l"
          placeholder="Enter a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {weatherData && (
        <div>
          <h2 className="text-lg mb-2">Current Weather</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
     )}
     </div>
   );
  }
  
  export default App;