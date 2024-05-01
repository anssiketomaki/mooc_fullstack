import App from '../App'


const CountryRow = ({name}) =>{
    return(
        <li>{name}</li>
    )
}

const Listing = (props) =>{
    const listing = props.cToShow
     if ( props.cToShow.length !== 1){
            return(
                <div>
                    <ul>
                        {listing.map(c =>
                            <CountryRow name={c.common} key={c.official}/>
                        )}
                    </ul>
                </div>
            )
    }
}


export default Listing
