import React, { useState } from 'react'
import AddInventory from './AddInventory'
import { useParams } from 'react-router-dom'
import { data } from "./../data";

const Edit = () => {
    const [editItem, setEditItem] = useState(data[0])
    let { name } = useParams()
    // console.log(name)
    // console.log(editItem)
  return (
    <div><AddInventory edit={true} itemToEdit={editItem}/></div>
  )
}

export default Edit