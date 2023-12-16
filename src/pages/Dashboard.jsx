import React, { useState } from "react";
import { data } from "./../data";
import ItemCard from "../componets/ItemCard";

const Dashboard = () => {
  const [items, setItems] = useState(data);
  const [selectedShop, setSelectedShop] = useState("Всі");
  // console.log(items.filter((item)=>item.status == 'В ремонті'));

  // console.log(items[3].status)
  // console.log("В ремонті")
  // console.log("В ремонті" === items[3].status)

  return (
    <>
    <div className="bg-yellow-50">

    
      {/* секція для техніки в ремонті */}
      <section className="dashboard p-4">
        <p className="text-red-950 text-lg">
          <strong>Техніка в ремонті:</strong>{" "}
        </p>
        <div className="inrepairWrapper flex gap-3 flex-wrap items-start">
          {items.length &&
            items
              .filter((item) => item.status === "В ремонті")
              .map((item) => (
                <ItemCard key={item.timeStamp} item={item} statusColor={"statusVarning"} />
              ))}
        </div>
      </section>
      {/* секція для Поламана техніка */}
      <section className="dashboard p-4">
        <p className="text-red-950 text-lg">
          {" "}
          <strong>Поламана техніка:</strong>
        </p>
        <div className="inrepairWrapper flex gap-3 flex-wrap items-start">
          {items.length &&
            items
              .filter((item) => item.status === "Зламаний")
              .map((item) => (
                <ItemCard key={item.timeStamp} item={item} statusColor={"statusDanger"} />
              ))}
        </div>
      </section>
      {/* роздільник */}
      <div className="border-b-2 border-red-950 my-4"></div>
      {/* секція всіє техніки по магазинах */}

      {/* вибір магазину в селекті для фільтрації */}
      <select className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950"
        value={selectedShop}
        onChange={(e) => setSelectedShop(e.target.value)}
      >
        <option value="Всі">Всі</option>
        <option value="Бельведерська">Бельведерська</option>
        <option value="Шашкевича">Шашкевича</option>
        <option value="Шпитальна">Шпитальна</option>
      </select>

      <section className="dashboard p-4">
        <p className="text-red-950 text-lg">
          Техніка з магазину: <strong>{selectedShop}</strong>
        </p>
        <div className="inrepairWrapper flex gap-3 flex-wrap items-start">
          {items.length &&
            items
              .filter((item) => {
                if (selectedShop === "Всі") {
                  return item;
                } else {
                  return item.place === selectedShop;
                }
              })
              .map((item) => <ItemCard key={item.timeStamp} item={item} />)}
        </div>
      </section>
      </div>
    </>
  );
};

export default Dashboard;
