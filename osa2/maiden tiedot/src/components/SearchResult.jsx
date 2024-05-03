import Listing from "./Listing"
import CountryView from "./CountryView"

const SearchResult = (props) => {
     
    const cts = props.cToShow.length
    //console.log(`montako tulee listaan resultissa (cts): ${cts}`)

    //console.log(`len näytettävät maat ${props.cToShow.length} `)

    if(cts >10){
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>        
        )
    }else if (cts !== 1){
 
        return(
            <div>
                <ul>
                    {props.cToShow.map(c =>
                        <Listing    name={c.common} 
                                    onShowButtonClick={props.onShowButtonClick}
                                    key={c.official}/>
                    )}
                </ul>
            </div>
        )

    } else if(cts === 1 ){
        //console.log(`näkyykö tää jos listassa vaan yks maa?. Näkyy! ${props.cToShow[0].common}`)

        return(
            <div>
                <CountryView  countryShow={props.cToShow[0]}
                            countryData = {props.countryData}
                            flagAdress = {props.flagAdress}
                        />
            </div>
        )
    }
        
}

export default SearchResult

