import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/weather');
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading) {
    return (
      <div className="weather-loading">
        <div className="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-error">
        <p>Error: {error}</p>
        <button onClick={fetchWeather} className="btn btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>Global Weather</h2>
        <button onClick={fetchWeather} className="btn btn-refresh">
          🔄 Refresh
        </button>
      </div>
      
      <div className="weather-grid">
        {weatherData.map((city, index) => (
          <div key={index} className="weather-card">
            <div className="weather-card-header">
              <h3>{city.name}</h3>
              <img 
                src={getWeatherIcon(city.icon)} 
                alt={city.description}
                className="weather-icon"
              />
            </div>
            
            <div className="weather-temp">
              {Math.round(city.temp)}°C
            </div>
            
            <div className="weather-desc">
              {city.description.charAt(0).toUpperCase() + city.description.slice(1)}
            </div>
            
            <div className="weather-details">
              <div className="weather-detail">
                <span>💧 Humidity</span>
                <span>{city.humidity}%</span>
              </div>
              <div className="weather-detail">
                <span>💨 Wind</span>
                <span>{city.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="weather-footer">
        <p>Data updates every 5 minutes • Powered by OpenWeatherMap</p>
      </div>
    </div>
  );
};

export default Weather;