import App from '../App'

const Person = (props) => {
    const {name, number} = props.info
    return(
        <li>{name} {number}</li>
    )
}

export default Person
