//import App from '../App'
import PropTypes from 'prop-types';

const PersonForm = (props) => {

    const handleNameChange = (event) => {
        props.onNameChange(event.target.value)
    }
    const handleNumberChange = (event) => {
        props.onNumberChange(event.target.value)
    }
    const handleAddName = (event) =>{
        event.preventDefault()
        props.onSubmit()
    }
    
      return (
        <form onSubmit={handleAddName}>
            <div>
                name: <input type="text" value={props.name} onChange={handleNameChange} />
                <br/>
                number: <input type="text" value={props.number} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
      )    
}
PersonForm.propTypes = {
    onNameChange: PropTypes.func.isRequired,
    onNumberChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};


export default PersonForm
