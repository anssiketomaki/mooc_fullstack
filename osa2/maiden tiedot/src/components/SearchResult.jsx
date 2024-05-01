import Listing from "./Listing"
import CountryView from "./CountryView"

const SearchResult = (props) => {

    if (props.cToShow.length >10){
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>        
        )
    
    }
    else if (props.cToShow.length !== 1)
    {   
        const LangRow = ({lang})=>{
            return(
                <li>{lang}</li>
            )
        }

        return(
            <div>
                <ul>
                    {props.cToShow.map(c =>
                        <CountryRow name={c.common} key={c.official}/>
                    )}
                </ul>
            </div>
        )
        /*
        return (
            <div>
                <Listing  usedFilter = {props.usedFilter}
                        cToShow = {props.cToShow}
                        countryShow={props.countryShow}
                        countryData = {props.countryData}
                        />
            </div>
        )*/
    }
    else if(props.cToShow.length === 1)
    {
        return(
            <div>
                <CountryView  countryShow={props.countryShow}
                            countryData = {props.countryData}
                        />
            </div>
        )
    }

   
    
}

export default SearchResult