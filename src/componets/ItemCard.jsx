import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { axiosConfig } from "../utils/axiosConfig";

const colorsForStatus = {
  Працює: "bg-green-600",
  Зламаний: "bg-red-700",
  "В ремонті": "bg-amber-600",
  "Не використовується": "bg-blue-700",
  "Під списання": "bg-slate-800",
  "Під ремонт": "bg-amber-400",
};

const ItemCard = ({ item, fetchData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const deleteHandler = (id) => {
    if (window.confirm("Точно видалити?")) {
      axios.delete(`https://inventory.dev.web.kameya.if.ua/app/item/${id}`, axiosConfig).then((res) => {
        if (res.status === 200) {
          toast.success('Елемент успішно видалений')
          fetchData()
        }
      }).catch((error) => {
        toast.error('Не получилось видалити')
      })
    }

  }
if(item.date){

  console.log( new Date())
  console.log(item.date)
  console.log(Date.parse(item.date))
}

// function додатиМісяці(вихіднаДата, кількістьМісяців) {
//   // Перетворюємо рядок з датою у об'єкт Date
//   let date = new Date(вихіднаДата);

//   // Додаємо певну кількість місяців до дати
//   date.setMonth(date.getMonth() + кількістьМісяців);

//   // Рахуємо різницю між поточною датою та новою датою
//   let різниця = date - new Date();

//   // Переводимо мілісекунди у дні та повертаємо кількість днів
//   return Math.floor(різниця / (1000 * 60 * 60 * 24));
// }

// // Вхідні дані
// let вихіднаДата = "Wed, 15 Nov 2023 00:00:00 GMT";
// let кількістьМісяців = 12;

// // Виклик функції та виведення результату
// let результат = додатиМісяці(вихіднаДата, кількістьМісяців);
// console.log("Кількість днів до нової дати:", результат);
  return (
    <div
      className=" border border-red-950 rounded-xl cursor-pointer bg-yellow-100 w-[320px] shadow-md relative"
      onClick={() => setModalVisible(!modalVisible)}
    >
      <div className="flex justify-between w-full items-center p-2">
        <div>
          <p className="text-md whitespace-nowrap text-red-950 leading-4"><strong>{item.name}</strong> </p>
        </div>
        <div
          className={`text-center px-2 text-white ${colorsForStatus[item.status]
            } rounded-xl line-clamp-1`}
        >
          {item.status}
        </div>
      </div>
      <span className="text-xs text-gray-600 line-clamp-1 px-2">
        Модель:{item.model}
        {item.serial !== "Невідомо" ? ` -> SN: ${item.serial}` : ""}
      </span>
      <div className="border-b-[1px] border-red-950"></div>


            {/* {console.log(item.date ? new Date() - item.date:' нема дати')} */}
            



      <div className="border-b-[1px] border-red-950"></div>
      <div className="px-2 items-center">
        <span className="px-2 my-1 inline-block bg-yellow-300 text-gray-800 rounded-lg">{item.place}</span>
        {item.subplace? ' -> ': ''}
        {item.subplace ? (
          <span className="text-xs px-2 my-1 inline-block bg-yellow-200 text-gray-800 rounded-lg">{`${item.subplace}`}</span>
        ) : (
          ""
        )}
      </div>
      {/* далі модалка */}
      <div
        className={`${modalVisible ? "block" : "hidden"
          } border border-red-950 absolute w-full rounded-lg mt-1 z-10 p-2 bg-yellow-100`}
      >
        <div className="text-center">
          <strong>Загальна інформація</strong>
        </div>
        {Object.keys(item).map((itemKey) => (
          <span key={itemKey} className="text-xs block py-1 ">
            {" "}
            <strong>{itemKey}</strong> : {item[itemKey]}
          </span>
        ))}
        <div className="flex justify-around text-white my-2">
          <Link to={`/edit/${item.id}`} className="statusInfo cursor-pointer px-2 rounded-lg">редагувати</Link>
          <Link to={`/move/${item.id}`} className="statusInfo cursor-pointer px-2 rounded-lg">переміщення</Link>
          <button onClick={() => deleteHandler(item.id)} className="statusDanger cursor-pointer px-2 rounded-lg">видалити</button>
        </div>
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
