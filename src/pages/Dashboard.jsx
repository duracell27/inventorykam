import React, { useState } from 'react'
import {data} from './../data'
import ItemCard from '../componets/ItemCard'

const Dashboard = () => {
  const [items, setItems] = useState(data)
  console.log(data)
  return (
    <section className="dashboard">
      <div className="inrepairWrapper">
        {items.length && items.map((item)=>(
          <ItemCard item={item}/>
        ))}
      </div>
    </section>
  )
}

export default Dashboard