import App from '../App'

const LangRow = ({lang})=>{
    return(
        <li>{lang}</li>
    )
}

const CountryView = ({flagAdress, countryData}) => {
    
    
    //console.log(countryData)
    if(countryData !== null){
        const flagAdress = countryData.flags.png
    return (
        <div>
            <h2>{countryData.name.common}</h2>
            <p>Capital: {countryData.capital}</p>
            <p>Area: {countryData.area}km2</p>
            <br />
            <b>Languages:</b>
            <ul>
            {Object.keys(countryData.languages).map(key =>
                    <LangRow lang ={countryData.languages[key]} key={key}/>
                    )}
            </ul>
            <img  src={flagAdress} alt="Flag of the country" />
        </div>
    )
    }
        
}

// capi, area, languages lippu

export default CountryView
