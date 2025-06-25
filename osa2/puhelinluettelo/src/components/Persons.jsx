//import App from '../App'
import Person from './Person'
import PropTypes from 'prop-types';

const Persons = (props) => {

    const toShow = props.persons.filter(p => 
         p.name.toLowerCase().includes(props.filt.toLowerCase())
         );
    
    return (
        <div>
            <ul>
            {toShow.map (r =>
                <Person key={r.id} 
                        info = {r}
                        handleDeletePerson={props.deletePerson}
                        />
                )}
            </ul>
        </div>
    );
}

Persons.propTypes = {
    persons: PropTypes.array.isRequired,
    filt: PropTypes.string.isRequired,
    deletePerson: PropTypes.func.isRequired
}
export default Persons
