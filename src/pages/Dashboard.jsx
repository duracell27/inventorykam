import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ItemCard from "../componets/ItemCard";
import axios from "axios";
import { axiosConfig, baseURL } from "../utils/axiosConfig";
import { SubDataContext } from "../App";

const Dashboard = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  // const [selectedShop, setSelectedShop] = useState(selectedShop || "Всі");
  // const [selectedCategory, setSelectedCategory] = useState(selectedCategory || "Не вибрано");
  const [itemsToFetch, setItemsToFetch] = useState(20);
  const [dsblbtn, setDsblbtn] = useState(false);
  const [inRepair, setInRepair] = useState([]);
  const [broken, setBroken] = useState([]);
  const [reNew, setReNew] = useState([]);

  const navigate = useNavigate();

  // const [search, setSearch] = useState('')

  const {
    places,
    subplaces,
    statuses,
    categories,
    searchInput,
    setSearchInput,
    selectedShop,
    setSelectedShop,
    selectedCategory,
    setSelectedCategory,
    selectedSubplace,
    setSelectedSubplace,
    selectedStatus,
    setSelectedStatus,
  } = useContext(SubDataContext);
  const { category, shop, subplace, status } = useParams();

  const fetchItemsWithProblem = async () => {
    axios
      .all([
        axios.get(
          `${baseURL}app/item?count=20&order=place&filter=status=В ремонті`,
          axiosConfig
        ),
        axios.get(
          `${baseURL}app/item?count=20&order=place&filter=status=Зламаний`,
          axiosConfig
        ),
        axios.get(
          `${baseURL}app/item?count=20&order=place&filter=status=Під оновлення`,
          axiosConfig
        ),
      ])
      .then(
        axios.spread((inRepair, broken, reNew) => {
          setInRepair(inRepair.data);
          setBroken(broken.data);
          setReNew(reNew.data);
          if (category && shop) {
            setSelectedCategory(category);
            setSelectedShop(shop);
            fetchData(itemsToFetch);
          }
        })
      );
  };
  useEffect(() => {
    fetchItemsWithProblem();
    // if (category && shop) {
    //   setSelectedCategory(category)
    //   setSelectedShop(shop)
    //   fetchData(itemsToFetch)
    // }
  }, []);

  const handleFetchAll = () => {
    let filterStr = generateFilterStringForApi();
    axios
      .get(
        `${baseURL}app/item?order=place,subplace,name${
          searchInput.length > 0 ? `&search=${searchInput}` : ""
        }${filterStr}`,
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        }
      });
  };

  const fetchData = (count) => {
    if (dsblbtn === true) {
      setDsblbtn(false);
      setItemsToFetch(20);
    }

    let filterStr = generateFilterStringForApi();

    axios
      .get(
        `${baseURL}app/item?count=${count}&order=place,subplace,name${
          searchInput.length > 0 ? `&search=${searchInput}` : ""
        }${filterStr}`,
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        }
      });
  };
  const handleInputPress = (e) => {
    if (e.keyCode === 13) {
      fetchData(itemsToFetch);
    }
  };

  useEffect(() => {
    fetchData(itemsToFetch);
  }, [
    itemsToFetch,
    selectedCategory,
    selectedShop,
    selectedSubplace,
    selectedStatus,
    searchInput
  ]);

  const handleItemsToFetch = () => {
    setItemsToFetch(itemsToFetch + 20);
  };

  const generateFilterStringForApi = () => {
    let filterArray = [];
    if (!(selectedShop === "Всі" || selectedShop === null)) {
      filterArray.push(`place=${selectedShop}`);
    } else {
      filterArray = filterArray.filter((i) => !i.includes("place"));
    }
    if (!(selectedCategory === "Не вибрано" || selectedCategory === null)) {
      filterArray.push(`category=${selectedCategory}`);
    } else {
      filterArray = filterArray.filter((i) => !i.includes("category"));
    }
    if (!(selectedSubplace === "Не вибрано" || selectedSubplace === null)) {
      filterArray.push(`subplace=${selectedSubplace}`);
    } else {
      filterArray = filterArray.filter((i) => !i.includes("subplace"));
    }
    if (!(selectedStatus === "Не вибрано" || selectedStatus === null)) {
      filterArray.push(`status=${selectedStatus}`);
    } else {
      filterArray = filterArray.filter((i) => !i.includes("status"));
    }

    return `&filter=${filterArray.join()}`;
  };

  const clearFilters = () => {
    setSelectedShop('Всі')
    setSelectedCategory('Не вибрано')
    setSelectedSubplace('Не вибрано')
    setSelectedStatus('Не вибрано')
  }

  const clearSearch = () => {
    setSearchInput('')
   
  }

  const handleSearch = () =>{
  fetchData(itemsToFetch);
  }

  return (
    <>
      <div className="bg-yellow-50 h-screen">
        <div className="border-b-2 border-red-950 pb-4"></div>
        <div className="flex justify-start flex-nowrap overflow-x-auto overflow-y-visible">
          {/* секція для техніки в ремонті */}
          <section className="dashboard p-4">
            <p className="text-red-950 text-lg">
              <strong>Техніка в ремонті:</strong>{" "}
            </p>
            <div className="inrepairWrapper flex gap-3 flex-nowrap items-start">
              {!inRepair.length && "Немає техніки в ремонті"}
              {inRepair.length > 0 &&
                inRepair.map((item) => (
                  <ItemCard
                    fetchData={fetchData}
                    key={item.id}
                    item={item}
                    itemsToFetch={itemsToFetch}
                    statusColor={"statusVarning"}
                  />
                ))}
            </div>
          </section>
          {/* секція для Поламана техніка */}
          <section className="dashboard p-4 ">
            <p className="text-red-950 text-lg">
              {" "}
              <strong>Поламана техніка:</strong>
            </p>
            <div className="inrepairWrapper flex gap-3 flex-nowrap items-start">
              {!broken.length && "Немає зламаної техніки"}
              {broken.length > 0 &&
                broken.map((item) => (
                  <ItemCard
                    fetchData={fetchData}
                    itemsToFetch={itemsToFetch}
                    key={item.id}
                    item={item}
                    statusColor={"statusDanger"}
                  />
                ))}
            </div>
          </section>
          {/* секція для під оновлення техніка */}
          <section className="dashboard p-4 ">
            <p className="text-red-950 text-lg">
              {" "}
              <strong>Під оновлення:</strong>
            </p>
            <div className="inrepairWrapper flex gap-3 flex-nowrap items-start">
              {!reNew.length && "Немає техніки під оновлення"}
              {reNew.length > 0 &&
                reNew.map((item) => (
                  <ItemCard
                    fetchData={fetchData}
                    itemsToFetch={itemsToFetch}
                    key={item.id}
                    item={item}
                    statusColor={"statusDanger"}
                  />
                ))}
            </div>
          </section>
        </div>

        {/* роздільник */}
        <div className="border-b-2 border-red-950 mb-4"></div>
        {/* секція всіє техніки по магазинах */}

        {/* вибір магазину в селекті для фільтрації */}
        <div className="flex items-center flex-col mt-6">
          <div className="m-2 flex flex-col">
            <span className="mx-4 mb-1 text-red-950">
              <strong>Пошук</strong>
            </span>
            <div className="">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleInputPress}
                className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950 min-w-[320px]"
              />
              <button onClick={handleSearch} className="bg-red-950 p-2 rounded-lg text-white">
                Пошук
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={()=> clearSearch()} className="bg-red-950 rounded-lg text-white p-2">
              очистити пошук
            </button>
            <button onClick={()=> clearFilters()} className="bg-red-950 rounded-lg text-white p-2">
              очистити фільтрації
            </button>
          </div>

          <div className="flex flex-col  md:flex-row">
            <div className="my-2">
              <span className="mx-4 mb-1 text-red-950">
                <strong>Виберіть підрозділ:</strong>
              </span>
              <select
                className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950 w-[90%]"
                value={selectedShop}
                onChange={(e) => {
                  setSelectedShop(e.target.value);
                  navigate(
                    `/${selectedCategory}/${e.target.value}/${selectedSubplace}/${selectedStatus}`
                  );
                }}
              >
                <option value="Всі">Всі</option>
                {places.length &&
                  places.map((place) => (
                    <option key={place.id} value={place.name}>
                      {place.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="my-2">
              <span className="mx-4 mb-1 text-red-950">
                <strong>Виберіть категорію:</strong>
              </span>
              <select
                className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950 w-[90%]"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  navigate(
                    `/${e.target.value}/${selectedShop}/${selectedSubplace}/${selectedStatus}`
                  );
                }}
              >
                <option value="Не вибрано">Не вибрано</option>
                {categories.length &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="my-2">
              <span className="mx-4 mb-1 text-red-950">
                <strong>Виберіть підмісце:</strong>
              </span>
              <select
                className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950 w-[90%]"
                value={selectedSubplace}
                onChange={(e) => {
                  setSelectedSubplace(e.target.value);
                  navigate(
                    `/${selectedCategory}/${selectedShop}/${e.target.value}/${selectedStatus}`
                  );
                }}
              >
                <option value="Не вибрано">Не вибрано</option>
                {subplaces.length &&
                  subplaces.map((subplace) => (
                    <option key={subplace.id} value={subplace.name}>
                      {subplace.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="my-2">
              <span className="mx-4 mb-1 text-red-950">
                <strong>Виберіть статус:</strong>
              </span>
              <select
                className="mx-4 p-2 rounded-lg border bg-yellow-50 border-red-950 w-[90%]"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  navigate(
                    `/${selectedCategory}/${selectedShop}/${selectedSubplace}/${e.target.value}`
                  );
                }}
              >
                <option value="Не вибрано">Не вибрано</option>
                {statuses.length &&
                  statuses.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <section className="dashboard bg-yellow-50 p-4">
          {/* <p className="text-red-950 text-lg text-center py-3">
            Техніка з підрозділу: <strong>{selectedShop}</strong>
          </p> */}
          <div className="inrepairWrapper flex gap-5 flex-wrap justify-center items-start">
            {!items.length && "Техніки не знайдено"}
            {items.length > 0 &&
              items.map((item, idx) => (
                <ItemCard
                  itemsToFetch={itemsToFetch}
                  fetchData={fetchData}
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
          <div className="flex w-full justify-center my-10 gap-4">
            <button
              onClick={handleItemsToFetch}
              disabled={items.length % 20 > 0}
              className="p-2 bg-red-950 rounded-lg text-white disabled:bg-slate-500 "
            >
              Загрузити ще
            </button>
            <button
              onClick={handleFetchAll}
              className="p-2 bg-red-950 rounded-lg text-white disabled:bg-slate-500 "
            >
              Загрузити всі
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
