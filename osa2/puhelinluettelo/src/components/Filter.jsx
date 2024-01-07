import App from '../App'

const Filter = (props) => {

    const handleFilterChange = (event) => {
      props.onFilterChange(event.target.value)
    }
  
    return (
      <div>
        <label>filter shown with </label>
        <input type='text' onChange={handleFilterChange} />
      </div>
    )
    
  }

export default Filter
