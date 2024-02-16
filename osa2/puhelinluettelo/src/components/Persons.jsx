import App from '../App'
import Person from './Person'

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

export default Persons
