import App from '../App'

const LangRow = ({lang})=>{
    return(
        <li>{lang}</li>
    )
}

const CountryView = (props) => {
    
    
    if ((props.countryShow === true || props.countryShow.length === 1 )
        && props.countryData !== null){
            console.log(props.countryData)
        //const country = props.CountryData
        return (
            <div>
                <h2>{props.countryData.name.common}</h2>
                <p>Capital: {props.countryData.capital}</p>
                <p>Area: {props.countryData.area}km2</p>
                <br />
                <b>Languages:</b>
                <ul>
                {Object.keys(props.countryData.languages).map(key =>
                        <LangRow lang ={props.countryData.languages[key]} key={key}/>
                        )}
                </ul>
            </div>
        )
    }
        
}

// capi, area, languages lippu

export default CountryView
