import React, { useEffect, useState } from "react";

const getFormattedDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let day = String(currentDate.getDate()).padStart(2, "0");

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const AddInventory = () => {
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [date, setDate] = useState(getFormattedDate());
  const [varanty, setVaranty] = useState("");
  const [status, setStatus] = useState("Виберіть");
  const [place, setPlace] = useState("Виберіть");
  const [subplace, setSubplace] = useState("Виберіть");
  const [category, setCategory] = useState("Виберіть");

  const handleSubmit = () => {
    const answers = {
      name,
      firm,
      model,
      serial,
      date,
      varanty,
      status,
      place,
      subplace,
      category,
    };
    
    setName("");
    setFirm("");
    setModel("");
    setSerial("");
    setDate(getFormattedDate());
    setVaranty("");
    setStatus("Виберіть");
    setPlace("Виберіть");
    setSubplace("Виберіть");
    setCategory("Виберіть");
    return answers;
  };

  return (
    <div className="flex flex-col w-full items-center bg-yellow-50">
      <div className="formWrapper max-w-xs">
        <h1 className="text-2xl text-center p-2 text-red-950">
          <strong>Додати Інвентар</strong>
        </h1>
        <label>
          Назва виробу
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Назва виробу"
            className="w-full p-2 border border-red-950 rounded-lg my-1"
          />
        </label>
        <label>
          Фірма виробу
          <input
            value={firm}
            onChange={(e) => setFirm(e.target.value)}
            type="text"
            placeholder="Фірма виробу"
            className="w-full p-2 border border-red-950 rounded-lg my-1"
          />
        </label>
        <label>
          Модель виробу
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            placeholder="Модель виробу"
            className="w-full p-2 border border-red-950 rounded-lg my-1"
          />
        </label>
        <label>
          Серійник виробу
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
            value={varanty}
            onChange={(e) => setVaranty(e.target.value)}
            type="text"
            placeholder="Термін"
            className="w-full p-2 border border-red-950 rounded-lg my-1"
          />
        </label>
        <label>
          Статус
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-red-950 my-1 rounded-lg"
          >
            <option value="Виберіть">Виберіть</option>
            <option value="Працює">Працює</option>
            <option value="Зламаний">Зламаний</option>
            <option value="В ремонті">В ремонті</option>
            <option value="Не використовується">Не використовується</option>
            <option value="Під списання">Під списання</option>
            <option value="Під ремонт">Під ремонт</option>
          </select>
        </label>
        <label>
          Розміщення
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-2 border border-red-950 my-1 rounded-lg"
          >
            <option value="Виберіть">Виберіть</option>
            <option value="Бельведерська">Бельведерська</option>
            <option value="Шпитальна">Шпитальна</option>
            <option value="Шашкевича">Шашкевича</option>
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
            <option value="Касова зона 1">Касова зона 1</option>
            <option value="Касова зона 2">Касова зона 2</option>
            <option value="Касова зона 3">Касова зона 3</option>
            <option value="Касова зона 4">Касова зона 4</option>
            <option value="Щиток">Щиток</option>
            <option value="Кладова">Кладова</option>
            <option value="Зал">Зал</option>
            <option value="Вулиця">Вулиця</option>
          </select>
        </label>
        <label>
          Категорія
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-red-950 my-1 rounded-lg"
          >
            <option value="Виберіть">Виберіть</option>
            <option value="Комп">Комп</option>
            <option value="Монітор">Монітор</option>
            <option value="Периферія">Периферія</option>
            <option value="Інтернет">Інтернет</option>
            <option value="Відеонагляд">Відеонагляд</option>
            <option value="Охорона">Охорона</option>
            <option value="Тв">Тв</option>
            <option value="Аудіо">Аудіо</option>
            <option value="Господарське">Господарське</option>
            <option value="Інший пристрій">Інший пристрій</option>
          </select>
        </label>
        <button
          onClick={handleSubmit}
          className="bg-red-950 text-white p-2 rounded-lg my-4 w-full"
        >
          Додати
        </button>
      </div>
    </div>
  );
};

export default AddInventory;
