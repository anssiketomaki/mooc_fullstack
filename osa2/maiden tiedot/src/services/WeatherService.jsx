import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/'
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const getWeather = (cityName) => {
    return axios.get(`${baseUrl}2.5/weather?q=${cityName}&appid=${apiKey}`)
}

export default{
    getWeather: getWeather,
}
