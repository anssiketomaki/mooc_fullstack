
import weatherService from "../services/WeatherService"
import { useEffect, useState } from 'react'

const CityWeather = ({cityName}) => {
    const [weatherData, setWeatherData]= useState(null)

    useEffect (() =>{
        if (!cityName){
            return;
        }
        weatherService
        .getWeather(cityName)
        .then(response =>{
            setWeatherData(response.data)
            console.log(response.data)
        })
        .catch(err => {
        console.error("Failed to fetch weather:", err);
        setError("Could not load weather data.");
      })
    }, [cityName])

    if(!weatherData){
        return (
            <div>
            <p>Loading weather data for {cityName}</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Weather in {cityName}</h2>
            <p>Temperature {(parseFloat(weatherData.main.temp)-273.15).toFixed(2)} degrees Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={`descriptive icon for the weather: ${weatherData.weather[0].icon}`} />
            <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default CityWeather
