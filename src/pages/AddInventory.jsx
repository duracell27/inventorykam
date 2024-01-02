import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../utils/axiosConfig";
import { SubDataContext } from "../App";

const getFormattedDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let day = String(currentDate.getDate()).padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const AddInventory = ({ edit, move, id }) => {

  const { categories, places, subplaces, statuses } = useContext(SubDataContext)

  const navigate = useNavigate("/");

  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [date, setDate] = useState(getFormattedDate());
  const [warranty, setWarranty] = useState("");
  const [status, setStatus] = useState("Виберіть");
  const [place, setPlace] = useState("Виберіть");
  const [subplace, setSubplace] = useState("Виберіть");
  const [category, setCategory] = useState("Виберіть");

  const [oldStatus, setOldStatus] = useState("Виберіть");
  const [oldPlace, setOldPlace] = useState("Виберіть");
  const [oldSubplace, setOldSubplace] = useState("Виберіть");

  useEffect(() => {
    if ((edit || move) && id) {
      axios.get(`https://inventory.dev.web.kameya.if.ua/app/item/${id}`, axiosConfig).then((res) => {

        if (res.status === 200) {
          setName(res.data.name)
          setFirm(res.data.firm)
          setModel(res.data.model)
          setSerial(res.data.serial)
          setDate(getFormattedDate(res.data.date))
          setWarranty(res.data.warranty)
          setStatus(res.data.status)
          setPlace(res.data.place)
          setSubplace(res.data.subplace)
          setCategory(res.data.category)

          setOldStatus(res.data.status)
          setOldPlace(res.data.place)
          setOldSubplace(res.data.subplace)
        }
      })
    }
  }, [edit, id])

  const handleSubmit = () => {
    let answers = {
      name,
      firm,
      model,
      serial,
      date: date === "" ? null : date,
      warranty,
      status,
      place,
      subplace,
      category,
      timestamp: new Date()
    };
    if (name.length < 3 || firm.length < 3 || model.length < 3 || serial.length < 3 || status === 'Виберіть' || place === "Виберіть" || category === "Виберіть") {
      toast.error('Заповніть всі обов\'язкові поля')
      return
    }

    if (edit && id) {
      axios.put(`https://inventory.dev.web.kameya.if.ua/app/item/${id}`, answers, axiosConfig).then((res) => {
        if (res.status === 200) {
          toast('Елемент успішно відредаговано')
          navigate('/')
        } else {
          toast('Сумно, нічого не получилось з того')
        }
      }).catch((error) => toast(error))
    } else if (move && id) {
      answers = { ...answers, hasChange: true, lastChange: new Date() }
      axios.put(`https://inventory.dev.web.kameya.if.ua/app/item/${id}`, answers, axiosConfig).then((res) => {
        if (res.status === 200) {
          let moveAnswers = {
            item: id,
            timestamp: new Date(),
          }
          if (oldStatus !== status) {
            moveAnswers = { ...moveAnswers, from: oldStatus, to: status, type: 'status' }
          } else if (oldPlace !== place) {
            moveAnswers = { ...moveAnswers, from: oldPlace, to: place, type: 'place' }
          } else if (oldSubplace !== subplace) {
            moveAnswers = { ...moveAnswers, from: oldSubplace, to: subplace, type: 'subplace' }
          }

          axios.post('https://inventory.dev.web.kameya.if.ua/app/change', moveAnswers, axiosConfig).then((res) => {
            console.log(res)
            if (res.status === 200) {
              toast('Елемент успішно переміщено')
              navigate('/')
            }

          })

        } else {
          toast('Сумно, нічого не получилось з того')
        }
      }).catch((error) => toast(error))
    } else {
      answers = {...answers, hasChange: false, lastChange: null}
      axios.post(`https://inventory.dev.web.kameya.if.ua/app/item`, answers, axiosConfig).then((res) => {

        if (res.status === 200) {
          toast('Елемент успішно додано')

          setName("");
          setFirm("");
          setModel("");
          setSerial("");
          setDate(getFormattedDate());
          setWarranty("");
          setStatus("Виберіть");
          setPlace("Виберіть");
          setSubplace("Виберіть");
          setCategory("Виберіть");
        } else {
          toast('Сумно, нічого не получилось з того')
        }

      }).catch((error) => toast(error))
    }
  };

  return (
    <div className="flex flex-col w-full items-center bg-yellow-50">
      <div className="formWrapper max-w-xs">
        <h1 className="text-2xl text-center p-2 text-red-950">
          <strong>{edit ? "Редагувати " : move ? "Перемістити" : "Додати "} Інвентар</strong>
        </h1>
        {!move ? (<>
          <label>
            Назва виробу *
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Назва виробу"
              className="w-full p-2 border border-red-950 rounded-lg my-1"
            />
          </label>
          <label>
            Фірма виробу *
            <input
              value={firm}
              onChange={(e) => setFirm(e.target.value)}
              type="text"
              placeholder="Фірма виробу"
              className="w-full p-2 border border-red-950 rounded-lg my-1"
            />
          </label>
          <label>
            Модель виробу *
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="Модель виробу"
              className="w-full p-2 border border-red-950 rounded-lg my-1"
            />
          </label>
          <label>
            Серійник виробу *
            <input
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              type="text"
              placeholder="Серійник виробу"
              className="w-full p-2 border border-red-950 rounded-lg my-1"
            />
          </label>
          <label>
            Дата покупки
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              placeholder="Серійник виробу"
              className="w-full block p-2 border border-red-950 rounded-lg my-1"
            />
          </label>
          <label>
            Термін гарантії в місяцях
            <input
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              type="text"
              placeholder="Термін"
              className="w-full p-2 border border-red-950 rounded-lg my-1"
            />
          </label><label>
            Категорія *
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-red-950 my-1 rounded-lg"
            >
              <option value="Виберіть">Виберіть</option>
              {categories.length && categories.map((category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}

            </select>
          </label></>) : null}

        {!edit ? (<><label>
          Статус *
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-red-950 my-1 rounded-lg"
          >
            <option value="Виберіть">Виберіть</option>
            {statuses.length && statuses.map((status) => (
              <option key={status.id} value={status.name}>{status.name}</option>
            ))}

          </select>
        </label>
          <label>
            Розміщення *
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full p-2 border border-red-950 my-1 rounded-lg"
            >
              <option value="Виберіть">Виберіть</option>
              {places.length && places.map((place) => (
                <option key={place.id} value={place.name}>{place.name}</option>
              ))}

            </select>
          </label>
          <label>
            Розміщення Під-категорія
            <select
              value={subplace}
              onChange={(e) => setSubplace(e.target.value)}
              className="w-full p-2 border border-red-950 my-1 rounded-lg"
            >
              <option value="Виберіть">Виберіть</option>
              {subplaces.length && subplaces.map((subplace) => (
                <option key={subplace.id} value={subplace.name}>{subplace.name}</option>
              ))}

            </select>
          </label></>) : (
          ''
        )}


        <button
          onClick={handleSubmit}
          className="bg-red-950 text-white p-2 rounded-lg my-4 w-full"
        >
          {edit ? 'Редагувати' : move ? "Перемістити" : 'Додати'}
        </button>
      </div>
    </div>
  );
};

export default AddInventory;
