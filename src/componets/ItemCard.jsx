import React, { useState } from "react";

const colorsForStatus = {
  Працює: "bg-green-600",
  Зламаний: "bg-red-700",
  "В ремонті": "bg-amber-600",
  "Не використовується": "bg-blue-700",
  "Під списання": "bg-slate-800",
  "Під ремонт": "bg-amber-400",
};

const ItemCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <div className=" border border-red-950 rounded-xl cursor-pointer bg-yellow-100 w-[320px] shadow-md relative" onClick={()=>setModalVisible(!modalVisible)}>
      <div className="flex justify-between w-full items-center p-2">
        <div>
          <p className="text-lg text-red-950 leading-4">{item.name}</p>
        </div>
        <div
          className={`text-center px-2 text-white ${
            colorsForStatus[item.status]
          } rounded-xl`}
        >
          {item.status}
        </div>
      </div>
      <span className="text-xs text-gray-600 text-ellipsis px-2">
        Модель:{item.model}{" "}
        {item.serial !== "Невідомо" ? ` -> SN: ${item.serial}` : ""}
      </span>
      <div className="border-b-[1px] border-red-950"></div>
      <div className="px-2 items-center">
        {item.place} {item.subplace ? (<span className="text-xs">{` -> ${item.subplace}`}</span>):''}
      </div>
      <div className={`${modalVisible ? 'block': 'hidden'} border border-red-950 absolute w-full rounded-lg mt-1 z-10 p-2 bg-yellow-100`}>
        <div className="text-center"><strong>Загальна інформація</strong></div>
        {Object.keys(item).map((itemKey)=><span key={itemKey} className="text-xs block py-1 "> <strong>{itemKey}</strong> : {item[itemKey]}</span>)}
      </div>
    </div>
  );
};

export default ItemCard;

// category: "Відеонагляд";
// firm: "3d optical mouse";
// model: "Невідомо";
// name: "Мишка до відеонагляду";
// place: "Бельведерська";
// serial: "Невідомо";
// status: "Працює";
// subplace: "Кладова";
// timeStamp: "12/14/2023 14:46";
