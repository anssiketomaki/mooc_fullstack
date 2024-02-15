import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

//import Person from './components/Person'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { id:0, name: 'Arto Hellas', number: '040-123456' },
  //   { id:1, name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { id:2, name: 'Dan Abramov', number: '12-43-234345' },
  //   { id:3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPnum, setNewPnum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect (()=>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  const handleAddName = () => {
    const ns = persons.map(p => p.name)
    if (ns.includes(newName)) 
    {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else
    {
      console.log('nimi lisätään', newName, newPnum)
      const newPerson = { id: persons.length
                        , name: newName
                        , number: newPnum                
                        }
      setPersons(persons.concat(newPerson))
      //console.log("Before: ", newName, newPnum)
      setNewName('')
      setNewPnum('')
      //console.log("Afta: ", newName, newPnum)
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

      <PersonForm name = {newName}
                  number = {newPnum}
                  onSubmit = {handleAddName}
                  onNameChange = {handleNameChange}
                  onNumberChange = {handlePnumChange}
                />

      <h2>Numbers</h2>
      <Persons persons={persons} filt={newFilter}/>
        
    </div>
  )

}

export default App
