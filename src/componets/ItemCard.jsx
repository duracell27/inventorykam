import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosConfig, baseURL } from "../utils/axiosConfig";
import CloseIcon from "./icons/CloseIcon";

const colorsForStatus = {
  Працює: "bg-green-600",
  Зламаний: "bg-red-700",
  "В ремонті": "bg-amber-600",
  "Не використовується": "bg-blue-700",
  "Під списання": "bg-slate-800",
  "Під ремонт": "bg-amber-400",
  "Під оновлення": "bg-indigo-400",
};

const ItemCard = ({ item, fetchData, itemsToFetch }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const deleteHandler = (id) => {
    if (window.confirm("Точно видалити?")) {
      axios
        .delete(
          `${baseURL}app/item/${id}`,
          axiosConfig
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Елемент успішно видалений");
            fetchData(itemsToFetch);
          }
        })
        .catch((error) => {
          toast.error("Не получилось видалити");
        });
    }
  };

  function getWarrantyTime(buyDate, amountOfmanth) {
    if (!buyDate) {
      return (
        <span className="px-1 rounded-lg bg-yellow-200 text-sm">
          не визначено
        </span>
      );
    }
    // Перетворюємо рядок з датою у об'єкт Date
    let date = new Date(buyDate);

    // Додаємо певну кількість місяців до дати
    date.setMonth(date.getMonth() + +amountOfmanth);

    // Рахуємо різницю між поточною датою та новою датою
    let timeDelta = date - new Date();

    // Переводимо мілісекунди у дні та повертаємо кількість днів
    let rezultDays = Math.floor(timeDelta / (1000 * 60 * 60 * 24));
    if (rezultDays >= 0) {
      return (
        <span className="px-1 rounded-lg bg-lime-500 text-white text-sm">
          {rezultDays} дн
        </span>
      );
    } else {
      return (
        <span className="px-1 rounded-lg bg-orange-400 text-white text-sm">
          завершилась
        </span>
      );
    }
  }

  const showDate = (date) => {
    if (!date) return "не вказано"
    const t = new Date(date);
    return t.toLocaleDateString();
  };


  return (
    <div
      className=" border border-red-950 rounded-xl cursor-pointer bg-yellow-100 w-[320px] shadow-md relative"
      onClick={() => setModalVisible(true)}
    >
      <div className="flex justify-between w-full items-center p-2 pb-1">
        <div>
          <p className="text-md text-red-950 leading-4">
            <strong>{item.name}</strong>
          </p>
        </div>
        <div
          className={`text-center px-2 text-white ${colorsForStatus[item.status]
            } rounded-xl line-clamp-1`}
        >
          {item.status}
        </div>
      </div>
      <span className="text-xs text-gray-600 line-clamp-1 overflow-hidden px-2 mb-2">
        Модель: {item.model}
        {item.serial !== "Невідомо" ? ` -> SN: ${item.serial}` : ""}
      </span>
      <div className="border-b-[1px] border-red-950"></div>

      <div className="px-2">
        Гарантія {getWarrantyTime(item.date, item.warranty)}
      </div>

      <div className="border-b-[1px] border-red-950"></div>
      <div className="px-2 items-center">
        <span className="px-2 my-1 inline-block bg-yellow-300 text-gray-800 rounded-lg">
          {item.place}
        </span>
        {item.subplace ? " -> " : ""}
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
        <div onClick={(e)=>{
          e.stopPropagation()
          setModalVisible(false)
        }} className="absolute right-1 top-1 bg-yellow-300 p-1 rounded-full">

          <CloseIcon />
        </div>

        <div className="">
          <span className="text-xs block py-1 ">
            <strong>Назва</strong> : {item.name}
          </span>
          <span className="text-xs block py-1 ">
            <strong>Фірма</strong> : {item.firm}
          </span>
          <span className="text-xs block py-1 ">
            <strong>Модель</strong> : {item.model}
          </span>
          <span className="text-xs block py-1 ">
            <strong>Серійник</strong> : {item.serial}
          </span>
          <div className="border-b-[1px] border-red-950"></div>
          <span className="text-xs block py-1 ">
            <strong>Дата покупки</strong> : {showDate(item.date)}
          </span>
          <span className="text-xs block py-1 ">
            <strong>Термін гарантії</strong> : {item.warranty === null ? "не вказано" : `${item.warranty} міс.`}
          </span>
        </div>
        {/* {Object.keys(item).map((itemKey) => (
          <span key={itemKey} className="text-xs block py-1 ">
            
            <strong>{itemKey}</strong> : {item[itemKey]}
          </span>
        ))} */}
        <div className="flex">
          <Link
            to={`/move/${item.id}`}
            className="statusInfo cursor-pointer px-2 rounded-lg w-full text-white text-center"
          >
            переміcтити / змінити статус
          </Link>
        </div>

        <div className="flex gap-2 text-white my-2">
          <Link
            to={`/edit/${item.id}`}
            className="statusInfo cursor-pointer px-2 rounded-lg text-center w-1/2"
          >
            редагувати
          </Link>

          <button
            onClick={() => deleteHandler(item.id)}
            className="statusDanger cursor-pointer px-2 rounded-lg text-center w-1/2"
          >
            видалити
          </button>
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
