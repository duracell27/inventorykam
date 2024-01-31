import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { axiosConfig, baseURL } from '../utils/axiosConfig'
import axios from 'axios'
import MoveCard from '../componets/MoveCard'

const MoveSingle = () => {
  let { id } = useParams()
 
  const [items, setItems] = useState([

  ]);
  useEffect(() => {
    axios.get(`${baseURL}app/item/${id}`, axiosConfig).then((res) => {
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
        Історія змін обладнання
      </h1>
      <div className="flex justify-center flex-wrap gap-5">
        {
          items?.map((item, idx) => <MoveCard key={item.id} item={item} />)}
      </div>
      <div className="flex w-full justify-center my-10">
        <Link to={'/moves'}
  
          className="p-2 bg-red-950 rounded-lg text-white disabled:bg-slate-500 "
        >
          Повернутись до всіх змін
        </Link>
      </div>
    </div>
  )
}

export default MoveSingle