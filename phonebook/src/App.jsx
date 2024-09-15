import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter'
import NewPeople from './components/NewPeople'
import PhoneList from './components/PhoneList'
import axios from 'axios'
import personService from './services/personService'

const Notification = ({ message, isError }) => {
  if (!message) {
    return
  } 

  const hideStyle = {
    margin: 0,
    padding: 0
  }

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borserStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
  }
  const notifStyleError = {
    color: 'red',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borserStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
  }

  return (
    <div className='notification'
    style={isError ? notifStyleError : notifStyle}>
      <p>{message}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('Insert name.')
  const [newNumber, setNewNumber] = useState('123-456')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  },[])

  const pToShow = persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleSubmit = (event) => {    
    event.preventDefault()
    
    const foundPerson = persons.find(p => p.name === newName)
    if (foundPerson !== undefined ) {      
      if (window.confirm(`${newName} is already on the list. Would you like to update his associated phone number?`)) {
        const pToChange = { ...foundPerson, number: newNumber}
        personService
          .put(pToChange)
          .then( (responseData) => {
            setPersons(persons.map( p => p.id === responseData.id ? responseData : p))
          })
          .catch( (error) => {
            setNotification(`${newName} is no longer in the server.`, true)
            setTimeout(() => setNotification(null), 5000)
            setPersons(persons.filter( p=> p.name !== foundPerson.name ))
          })
      }
      return
    }
    const nameObj = {
      name: newName,
      number: newNumber
    }
    personService
      .create(nameObj)
      .then( response => {
        setPersons(persons.concat(response))
      })    
    setNewName('Insert name.')
    setNewNumber('123-456')
    setNotification([`Inserted '${nameObj.name}' to the list.`, false])
    setTimeout(() => {
     setNotification(null)
    }, 5000)
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChange2 = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const delFunctionOf = (person) => {
    return () => {
      if (window.confirm(`Really delete ${person.name}?`)) {
        personService
          .dltFromDb(person.id)
          .then(
            (deletedNote) => {
              setPersons(persons.filter(p => p.id !== deletedNote.id))
            })
      }      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={newFilter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <NewPeople 
      nameValue={newName} 
      nameOnChange={handleChange} 
      numberValue={newNumber} 
      numberOnChange={handleChange2} 
      onSmash={handleSubmit} />
      { notification ? <Notification message={notification} /> : <div></div>}
      <h2>Numbers</h2>
      <PhoneList 
      persons={pToShow}
      delFunctions={pToShow.map(p => [delFunctionOf(p), p])} />
    </div>
  )
}

export default App