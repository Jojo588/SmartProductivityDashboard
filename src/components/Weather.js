import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "ce118444b00513991cf24927ad85f653";

export default function Weather() {
  const [city, setCity] = useState("Nairobi");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow max-sm:h-52">
      <h2 className="text-lg font-semibold mb-2">🌤️ Weather</h2>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 p-2 border rounded w-4/6"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={fetchWeather}
        >
          Fetch
        </button>
      </div>
      {weather && (
        <div>
          <p className="text-xl font-bold">{weather.name}</p>
          <p>{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
