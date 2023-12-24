import React, { useState } from "react";
import MoveCard from "../componets/MoveCard";

const Moves = () => {
  const [itemsToFetch, setItemsToFetch] = useState(20)
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Касовий принтер",
      place: "Арсен",
      changes: [
        {
          changeType: "place",
          from: "Шашкевича",
          to: "Арсен",
          timestamp: "Wed, 15 Nov 2023 12:34:50 GMT",
        },
        {
          changeType: "status",
          from: "В ремонті",
          to: "Працює",
          timestamp: "Wed, 13 Nov 2023 15:30:40 GMT",
        },
      ],
    },
    
  ]);
  const handleItemsToFetch = () => {
    setItemsToFetch(itemsToFetch + 20)
  }
  return (
    <div className="h-screen bg-yellow-50">
      <h1 className="text-2xl text-center color-red-950 py-10">
        Історія змін обладнання
      </h1>
      <div className="flex justify-center flex-wrap gap-5">
        {items.length &&
          items.map((item, idx) => <MoveCard key={item.id} item={item} />)}
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
