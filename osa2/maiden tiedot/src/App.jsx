import { useEffect, useState } from 'react'
import CountryService from './services/CountryService';
import SearchForm from './components/SearchForm';
import Listing from './components/Listing';
import './App.css'

function App() {
  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    console.log('effect')
    getCountries();
  },[]);

  const getCountries = () => {
    CountryService
    .getAll()
    .then(response =>{
      const names = response.data.map(country => ({
        common: country.name.common, official: country.name.official
      }))
      setCountryNames(names);
      //console.log(names)
    })
  }

  const getCountryData = (name) => {
    CountryService
    .getCountry(name)
    .then(response=>{
      setCountryData(response.data)
      console.log(response.data)
    })
  }

  const handleFilterChange = (newF) =>{
    console.log(`setting new filter to be ${newF}`)
    setNewFilter(newF);

  }

  return (

      <div>
        
        <SearchForm onFilterChange = {handleFilterChange} />
        <Listing  countries = {countryNames}
                  usedFilter = {newFilter}
                  />

      </div>

      
      

  )
}

export default App
