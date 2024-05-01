import App from '../App'

const SearchForm = (props) => {

    const handleFilterChange = (event) => {

        props.onFilterChange(event.target.value)
    }
    
    return (
        <div>
            find countries <input type="text" value={props.cfilter} onChange={handleFilterChange} />
        </div>
    )    
}

export default SearchForm
