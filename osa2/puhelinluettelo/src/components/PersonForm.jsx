import App from '../App'

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

export default PersonForm
