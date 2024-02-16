import { useState, useEffect } from 'react'
import PersonService from './services/PersonService'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPnum, setNewPnum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect (()=>{
    console.log('effect')
    getPersons()
  }, [])

  const getPersons = () =>{
    PersonService
      .getAll()
      .then(response =>{
        setPersons(response.data)
    })
  }

  const handleAddName = () => {
    console.log('nimi lisätään', newName, newPnum)
    const newpers = persons.find(p => p.name === newName)
    console.log(`result from finding from phonebook ${newpers}`)
    if (typeof newpers !== 'undefined'){
      if(window.confirm(`${newName} is already in the phonebook. Want to replace old number
                        ${newpers.number} with ${newPnum}`))
      {
        const updatedpers = {...newpers, number: newPnum};
        PersonService
          .update(newpers.id, updatedpers)
          .then(response =>{
            setPersons(persons.map(p => p.id !== newpers.id ? p : response.data))
          })
          .catch(error => {
            console.log(`could not change number for person ${newpers.name}`)
          })
        setNewName('')
        setNewPnum('')
      }
    }else{
      const newPerson = { name: newName
        , number: newPnum                
        }
      PersonService
      .create(newPerson)
      .then(response =>{
        setPersons(persons.concat(response.data))
      })

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
  const handleDeletePerson = (delP) => {
    const deletable = persons.find(p => p.id === delP);
    if(window.confirm(`Delete ${deletable.name}?`)){
      PersonService
        .deletePerson(delP)
        .then(response =>{
          //console.log(response)
          if (response.status === 200){
            setPersons( persons.filter(person => person.id !== delP)
          )} else{
            console.log('some error unknown in deletion')
          }
        })
        .catch(error => {
          console.log(`could not delete person ${delP}`)
        })
      }
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
        <Persons  persons={persons} 
                  filt={newFilter}
                  deletePerson = {handleDeletePerson}
                />
        
    </div>
  )

}

export default App
