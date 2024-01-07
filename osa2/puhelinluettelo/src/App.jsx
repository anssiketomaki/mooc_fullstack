import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

//import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id:0, name: 'Arto Hellas', number: '040-123456' },
    { id:1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id:2, name: 'Dan Abramov', number: '12-43-234345' },
    { id:3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPnum, setNewPnum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleAddName = () => {
    const ns = persons.map(p => p.name)
    if (ns.includes(newName)) 
    {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else
    {
      console.log('nimi lisätään', newName, newPnum)
      const newPerson = { id: persons.length +1
                        , name: newName
                        , pnum: newPnum                
                        }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPnum('')
    }
  }
  const handleNameChange = (newNa) =>{
    setNewName(newNa)
  }
  const handlePnumChange = (newNu) =>{
    setNewPnum(newNu)
  }
  const handleFilterChange = (newF) =>{
    setNewFilter(newF)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
 
      <Filter onFilterChange= {handleFilterChange}/> 
      <br />
      
      <h2>add a new</h2>

      <PersonForm onSubmit = {handleAddName}
                  onNameChange = {handleNameChange}
                  onNumberChange = {handlePnumChange}
                  />

      <h2>Numbers</h2>
      <Persons persons={persons} filt={newFilter}/>
        
    </div>
  )

}

export default App
