
import React from 'react'

const Findit = (props,newName) => {
        const posi = props.findIndex(obj => obj.name === newName)
        return posi
      }

export default Findit