import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosConfig, baseURL } from "../utils/axiosConfig";
import { SubDataContext } from "../App";
import TextareaAutosize from "react-textarea-autosize";

const getFormattedDate = (dateIn) => {
  if (dateIn === null) {
    return "";
  }
  // let currentDate = new Date();
  let dateToConvert;
  if (dateIn) {
    dateToConvert = new Date(dateIn);
  } else {
    dateToConvert = new Date();
  }

  let year = dateToConvert.getFullYear();
  let month = String(dateToConvert.getMonth() + 1).padStart(2, "0");
  let day = String(dateToConvert.getDate()).padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const AddInventory = ({ edit, move, id }) => {
  const { categories, places, subplaces, statuses } =
    useContext(SubDataContext);

  const navigate = useNavigate("/");

  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [date, setDate] = useState("");
  const [warranty, setWarranty] = useState("");
  const [status, setStatus] = useState("Не вибрано");
  const [place, setPlace] = useState("Не вибрано");
  const [subplace, setSubplace] = useState("Не вибрано");
  const [category, setCategory] = useState("Не вибрано");
  const [comment, setComment] = useState("");

  const [oldStatus, setOldStatus] = useState("Не вибрано");
  const [oldPlace, setOldPlace] = useState("Не вибрано");
  const [oldSubplace, setOldSubplace] = useState("Не вибрано");

  useEffect(() => {
    if ((edit || move) && id) {
      axios.get(`${baseURL}app/item/${id}`, axiosConfig).then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setFirm(res.data.firm);
          setModel(res.data.model);
          setSerial(res.data.serial);
          setDate(getFormattedDate(res.data.date));
          setWarranty(res.data.warranty === null ? "" : res.data.warranty);
          setStatus(res.data.status);
          setPlace(res.data.place);
          setSubplace(res.data.subplace);
          setCategory(res.data.category);
          setComment(res.data.comment);

          setOldStatus(res.data.status);
          setOldPlace(res.data.place);
          setOldSubplace(res.data.subplace);
        }
      });
    }
  }, [edit, id]);

  const handleSubmit = () => {
    let answers = {
      name: name.trim(),
      firm: firm.trim(),
      model: model.trim(),
      serial: serial.trim(),
      date: date === "" ? null : date,
      warranty: warranty.trim(),
      status,
      place,
      subplace,
      category,
      timestamp: new Date(),
      comment,
    };

    if (edit && id) {
      if (
        name.length < 1 ||
        firm.length < 1 ||
        model.length < 1 ||
        serial.length < 1 ||
        category === "Не вибрано"
      ) {
        toast.error("Заповніть всі обов'язкові поля");
        return;
      }
      axios
        .put(`${baseURL}app/item/${id}`, answers, axiosConfig)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Елемент успішно відредаговано");
            navigate(-1);
          } else if (res.status === 403) {
            toast.error("У вас не достатньо прав щоб це робити");
          } else {
            toast.error("Сумно, нічого не получилось з того");
          }
        })
        .catch((error) => toast(error));
    } else if (move && id) {
      if (status === "Не вибрано" || place === "Не вибрано") {
        toast.error("Заповніть всі обов'язкові поля");
        return;
      }
      answers = { ...answers, hasChange: true, lastChange: new Date() };
      axios
        .put(`${baseURL}app/item/${id}`, answers, axiosConfig)
        .then((res) => {
          if (res.status === 200) {
            let moveAnswers = {
              item: id,
              timestamp: new Date(),
            };
            if (oldStatus !== status) {
              moveAnswers = {
                ...moveAnswers,
                from: oldStatus,
                to: status,
                type: "status",
              };
              axios
                .post(`${baseURL}app/change`, moveAnswers, axiosConfig)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("Статус успішно змінено");
                  }
                });
            }
            if (oldPlace !== place) {
              moveAnswers = {
                ...moveAnswers,
                from: oldPlace,
                to: place,
                type: "place",
              };
              axios
                .post(`${baseURL}app/change`, moveAnswers, axiosConfig)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("Елемент успішно переміщено");
                  }
                });
            }
            if (oldSubplace !== subplace) {
              moveAnswers = {
                ...moveAnswers,
                from: oldSubplace,
                to: subplace,
                type: "subplace",
              };
              axios
                .post(`${baseURL}app/change`, moveAnswers, axiosConfig)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("Підкатегорію успішно змінено");
                  }
                });
            }

            // axios.post(`${baseURL}app/change`, moveAnswers, axiosConfig).then((res) => {
            //   if (res.status === 200) {
            //     toast.success('Елемент успішно переміщено')}})

            navigate("/");
          } else if (res.status === 403) {
            toast.error("У вас не достатньо прав щоб це робити");
          } else {
            toast.error("Сумно, нічого не получилось з того");
          }
        })
        .catch((error) => toast(error));
    } else {
      if (
        name.length < 1 ||
        firm.length < 1 ||
        model.length < 1 ||
        serial.length < 1 ||
        status === "Не вибрано" ||
        place === "Не вибрано" ||
        category === "Не вибрано"
      ) {
        toast.error("Заповніть всі обов'язкові поля");
        return;
      }
      answers = { ...answers, hasChange: false, lastChange: null };
      axios
        .post(`${baseURL}app/item`, answers, axiosConfig)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Елемент успішно додано");

            setName("");
            setFirm("");
            setModel("");
            setSerial("");
            setDate("");
            setWarranty("");
            setStatus("Не вибрано");
            setPlace("Не вибрано");
            setSubplace("Не вибрано");
            setCategory("Не вибрано");
            setComment("");

            window.scrollTo(0, 0);
          } else if (res.status === 403) {
            toast.error("У вас не достатньо прав щоб це робити");
          } else {
            toast.error("Сумно, нічого не получилось з того");
          }
        })
        .catch((error) => toast(error));
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-yellow-50">
      <div className="formWrapper max-w-xs">
        <h1 className="text-2xl text-center p-2 text-red-950">
          <strong>
            {edit ? "Редагувати " : move ? "Перемістити" : "Додати "} Інвентар
          </strong>
        </h1>
        {!move ? (
          <>
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
            </label>
            <label>
              Категорія *
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-red-950 my-1 rounded-lg"
              >
                <option value="Не вибрано">Не вибрано</option>
                {categories.length &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </label>
            {/* тут елементи для просто показу, задіслейблені нижче*/}
            <div className="bg-yellow-200 rounded-lg">
              <label>
                Статус
                <select
                  value={status}
                  className="w-full p-2 border border-red-950 my-1 rounded-lg"
                  disabled
                >
                  <option>{status}</option>
                </select>
              </label>
              <label>
                Розміщення
                <select
                  value={place}
                  className="w-full p-2 border border-red-950 my-1 rounded-lg"
                  disabled
                >
                  <option>{place}</option>
                </select>
              </label>
              <label>
                Розміщення підкатегорія
                <select
                  value={subplace}
                  className="w-full p-2 border border-red-950 my-1 rounded-lg"
                  disabled
                >
                  <option>{subplace}</option>
                </select>
              </label>
            </div>
            {/* тут елементи для просто показу, задіслейблені вище*/}
          </>
        ) : null}

        {!edit ? (
          <>
            <label>
              Статус *
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-red-950 my-1 rounded-lg"
              >
                <option value="Не вибрано">Не вибрано</option>
                {statuses.length &&
                  statuses.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
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
                <option value="Не вибрано">Не вибрано</option>
                {places.length &&
                  places.map((place) => (
                    <option key={place.id} value={place.name}>
                      {place.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Розміщення підкатегорія
              <select
                value={subplace}
                onChange={(e) => setSubplace(e.target.value)}
                className="w-full p-2 border border-red-950 my-1 rounded-lg"
              >
                <option value="Не вибрано">Не вибрано</option>
                {subplaces.length &&
                  subplaces.map((subplace) => (
                    <option key={subplace.id} value={subplace.name}>
                      {subplace.name}
                    </option>
                  ))}
              </select>
            </label>
            {/* тут елементи для просто показу, задіслейблені нижче*/}
            <div className="bg-yellow-200 rounded-lg">
              <label>
                Назва виробу
                <input
                  value={name}
                  type="text"
                  className="w-full p-2 border border-red-950 rounded-lg my-1"
                  disabled
                />
              </label>
              <label>
                Фірма виробу
                <input
                  value={firm}
                  type="text"
                  className="w-full p-2 border border-red-950 rounded-lg my-1"
                  disabled
                />
              </label>
              <label>
                Модель виробу
                <input
                  value={model}
                  type="text"
                  className="w-full p-2 border border-red-950 rounded-lg my-1"
                  disabled
                />
              </label>
              <label>
                Категорія
                <select
                  value={category}
                  disabled
                  className="w-full p-2 border border-red-950 my-1 rounded-lg"
                >
                  <option>{category}</option>
                </select>
              </label>
            </div>
            {/* тут елементи для просто показу, задіслейблені вище*/}
          </>
        ) : (
          ""
        )}

        {!move ? (
          <>
            <label>
              Коментар
              <TextareaAutosize
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Коментар"
                className="w-full p-2 border border-red-950 rounded-lg my-1"
              />
            </label>
          </>
        ) : null}

        <button
          onClick={handleSubmit}
          className="bg-red-950 text-white p-2 rounded-lg my-4 w-full"
        >
          {edit ? "Редагувати" : move ? "Перемістити" : "Додати"}
        </button>
      </div>
    </div>
  );
};

export default AddInventory;
