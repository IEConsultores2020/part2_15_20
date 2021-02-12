import React from 'react'

const Person =  ({ person, deletePerson }) => {
  const label = person.id
    ? 'Borrado1' : 'Borrado2'
  return (
    <li className='note'>{person.name} | {person.number}
         <button onClick={deletePerson}>{label}</button>
    </li>    
    )
}

export default Person