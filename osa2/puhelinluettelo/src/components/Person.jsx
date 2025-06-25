//import App from '../App'
import PropTypes from 'prop-types';

const Person = (props) => {
    const {id, name, number} = props.info;

    const handleDeletePerson = (event) => {
        event.preventDefault();
        props.handleDeletePerson(id);
    };

    return(
        <li>{name} {number} {
            <button onClick={handleDeletePerson}>delete</button>
            }</li>
    );
}

Person.propTypes = {
    info: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    handleDeletePerson: PropTypes.func.isRequired,
};

export default Person
