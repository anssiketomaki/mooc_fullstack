import App from '../App'

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

export default Person
