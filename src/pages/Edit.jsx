import React from 'react'
import AddInventory from './AddInventory'
import { useParams } from 'react-router-dom'

const Edit = () => {
  let { id } = useParams()


  return (
    <div><AddInventory edit={true} move={false} id={id} /></div>
  )
}

export default Edit