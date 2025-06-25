//import App from '../App'
import PropTypes from 'prop-types';

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
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter
