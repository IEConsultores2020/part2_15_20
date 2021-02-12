import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from './services/persons'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Telephone app, Department of Computer Science, University of Helsinky 2021</em>
    </div>
  )
}

const App = () => {
  const [persons, setPersons ] = useState([])
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
     
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage('Added '+ newName)
        setTimeout(() =>{
          setErrorMessage(null)
        },5000)
        setNewName('')
        setNewNumber('')        
      })
  }
  
  const modifyPerson = (event) => {
    event.preventDefault()
    const person = persons.find(n => n.name === newName)
    const changedPerson = { ...person, number: newNumber }

    if (changedPerson.id === undefined)
     { addPerson(event) 
     }
    else
     {if (window.confirm("Cambiar el numero de " + newName +"?")) {  
       personService
        .update(changedPerson.id,changedPerson)
        .then(returnedPerson => {
          setPersons(persons)
          setErrorMessage('Updated '+ newName)
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
          setNewName('')
          setNewNumber('')  
        })
        }

     }
     }

  const deletePersonId = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm("Delete " + person.name, "confirmation")) {
      personService
       .erase(id)
       .then(returnedPerson => {
        setPersons(persons)
         setErrorMessage('Deleted '+ person.name)
         setTimeout(() => {
          setErrorMessage(null)
        },5000)
       })
       .catch(error => {
         setErrorMessage(
           'Person '+persons.name+ ' was already removed from server')
       }, 5000)
       setPersons(persons.filter(n => n.id !== id))
    }
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }  

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.id)

  const Notification = ({ message } ) => {
    
    if (message === null)
    {
      return null
    }
  if (message.substr(0,5) === 'Added')
     {
      return (
        <div className = "add" >
          {message}
        </div>
      )
     }
    if (message.substr(0,7) === 'Updated')
    {
      return (
        <div className = "update" >
          {message}
        </div>
      )
     }

    return (
      <div className = "error" >
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'all' : 'all' }
        </button>
      </div>
      <h1>Telephone List</h1>
      <h1>Name | Phone</h1>
      <ul>
        {personsToShow.map((person, i) => 
          <Person 
            key={i} 
            person={person}
            deletePerson={() => deletePersonId(person.id)} />
        )}
      </ul>                 
      <form onSubmit={modifyPerson}>
        <h3> Nombre</h3>
        <input value={newName}
               onChange={handleNameChange}
               />
        <h3> Teléfonos </h3>                     
        <input value={newNumber} 
               onChange={handleNumberChange} />  
        <button type="submit">add</button>
      </form>
      <Footer />
    </div>    
  )
  }

export default App;