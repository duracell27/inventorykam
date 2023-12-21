import React from 'react'
import AddInventory from './AddInventory'
import { useParams } from 'react-router-dom'

const Move = () => {
  let { id } = useParams()


  return (
    <div><AddInventory edit={false} move={true} id={id} /></div>
  )
}

export default Move