import App from '../App'

const CountryRow = ({name}) =>{
    return(
        <li>{name}</li>
    )
}

const Listing = (props) =>{
    
    const toShow = props.countries.filter(p => 
        p.common.toLowerCase().includes(props.usedFilter.toLowerCase())
    )

    console.log(toShow.length)
    if (toShow.length > 10){
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>        
        )
    }
    else
    {
        return(
            <div>
                <ul>
                {toShow.map(c =>
                    <CountryRow name={c.common} key={c.official}/>
                )}
                </ul>
            </div>
        )
    }
}

export default Listing
