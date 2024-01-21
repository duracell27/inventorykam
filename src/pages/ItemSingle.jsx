import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { axiosConfig, baseURL } from '../utils/axiosConfig'
import axios from 'axios'
import ItemCard from '../componets/ItemCard'

const ItemSingle = () => {
  let { id } = useParams()
 
  const [items, setItems] = useState([

  ]);
  useEffect(() => {
    axios.get(`${baseURL}app/item/${id}`, axiosConfig).then((res) => {
      console.log(res)
      if (res.status === 200) {
        let arr = []
        arr.push(res.data)
        setItems(arr)
      }
    })
  }, [])

  return (
    <div className=" bg-yellow-50">
      <h1 className="text-2xl text-center color-red-950 py-10">
        Інформація про елемент
      </h1>
      <div className="flex justify-center flex-wrap gap-5">
        {
          items?.map((item, idx) => <ItemCard key={item.id} item={item} />)}
      </div>
      <div className="flex w-full justify-center my-10">
        <Link to={'/Не вибрано/Всі'}
  
          className="p-2 bg-red-950 rounded-lg text-white disabled:bg-slate-500 "
        >
          Повернутись до всіх елемеентів
        </Link>
      </div>
    </div>
  )
}

export default ItemSingle