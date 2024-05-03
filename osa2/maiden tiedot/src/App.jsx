import { useEffect, useState } from 'react'
import CountryService from './services/CountryService';
import SearchForm from './components/SearchForm';
import './App.css'
import SearchResult from './components/SearchResult';

function App() {
  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [newFilter, setNewFilter] = useState('');
  
  const [countryToShow, setCountryToShow] = useState([]);
  const [flag, setFlag] = useState(null);


  useEffect(()=>{
    console.log('effect')
    getCountries();
  },[]);
  
  useEffect(() => {
    if (countryToShow.length === 1) {
      handleGetCountryData(countryToShow[0].common.toLowerCase());
    }
  }, [countryToShow]);


  const getCountries = () => {
    CountryService
    .getAll()
    .then(response =>{
      const names = response.data.map(country => ({
        common: country.name.common, official: country.name.official
      }))
      setCountryNames(names);
    })
    .catch(error => {
      console.error("Error fetching countries:", error);
    });
  }

  const handleGetCountryData = (name) => {
    CountryService
    .getCountry(name)
    .then(response=>{
      setCountryData(response.data)
      console.log(response.data)
      if (response.data.flags.png) {
        handleGetFlag(response.data.flags.png);
      }
    })
   .catch(error => {
    console.error("Error fetching country data:", error);
    })

  }
  const handleGetFlag = (flagUrl) => {
    CountryService
    .getFlag(flagUrl)
    .then(response=>{
      setFlag(response.data)
    })
   .catch(error => {
    console.error("Error fetching country flag:", error);
    })
  }
  const handleFilterChange = (newF) =>{

    console.log(`setting new filter to be: ${newF}`)
    setNewFilter(newF.toLowerCase());
    
    setCountryToShow(countryNames.filter(c =>
      c.common.toLowerCase().includes(newF.toLowerCase())
      ))
  }
  const handleShowButtonClick = (name) => {
    console.log("filtteröidään", name)
    setNewFilter(name.toLowerCase());

    setCountryToShow(countryToShow.filter(c =>
      c.common.toLowerCase() === name.toLowerCase()    
    ))
  }

  return (

      <div>
        <SearchForm onFilterChange = {handleFilterChange}
                    cfilter = {newFilter} />
                    
        <SearchResult 
                  cNames = {countryNames}
                  usedFilter = {newFilter}
                  cToShow = {countryToShow}
                  countryData = {countryData}
                  flagAdress = {flag}
                  onShowButtonClick = {handleShowButtonClick}
                  /> 
      </div>

  )
}

export default App
