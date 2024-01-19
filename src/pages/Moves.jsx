import React, { useEffect, useState } from "react";
import MoveCard from "../componets/MoveCard";
import axios from "axios";
import { axiosConfig, baseURL } from "../utils/axiosConfig";

const Moves = () => {
  const [itemsToFetch, setItemsToFetch] = useState(20)
  const [items, setItems] = useState([
    
  ]);
  useEffect(()=>{
    axios.get(`${baseURL}app/item?order=lastChange&reverse&filter=hasChange=true`, axiosConfig).then((res)=>{
      if (res.status === 200) {
        setItems(res.data)
      }
    })
  },[])
  const handleItemsToFetch = () => {
    setItemsToFetch(itemsToFetch + 20)
  }
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
        <button
          onClick={handleItemsToFetch}
          disabled={items.length % 20 > 0}
          className="p-2 bg-red-950 rounded-lg text-white disabled:bg-slate-500 "
        >
          Загрузити ще
        </button>
      </div>
    </div>
  );
};

export default Moves;
