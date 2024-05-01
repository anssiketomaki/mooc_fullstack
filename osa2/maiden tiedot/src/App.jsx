import { useEffect, useState } from 'react'
import CountryService from './services/CountryService';
import SearchForm from './components/SearchForm';
import './App.css'
import SearchResult from './components/SearchResult';

function App() {
  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [newFilter, setNewFilter] = useState('');
  
  const [countryShow, setCountryShow] = useState(false);
  const [countryToShow, setCountryToShow] = useState([]);

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
   .catch(error => {
    console.error("Error fetching country data:", error);
    })
  }
  const handleFilterChange = (newF) =>{
    console.log(`setting new filter to be: ${newF}`)
    setNewFilter(newF.toLowerCase());

    const result = countryNames.filter(c =>
      c.common.toLowerCase().includes(newFilter.toLowerCase())
      )
    console.log(result)
    if (result.length !== 1){
      setCountryShow(false)
      setCountryData(null)
    }else{
      setCountryShow(true)
      setCountryToShow(result[0].common)
      getCountryData(result[0].common)
    } 
  }
  //boolean pois ja vaan listan pituus määrittäjäksi!
  //show-napista vaihtaa maan nimen hakukenttään!

  return (

      <div>
        
        <SearchForm onFilterChange = {handleFilterChange}
                    cfilter = {newFilter} />
                    
        <SearchResult usedFilter = {newFilter}
                  cToShow = {countryToShow}
                  countryShow={countryShow}
                  countryData = {countryData}
                  />
      </div>

      
      

  )
}

export default App
