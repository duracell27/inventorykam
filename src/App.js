import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInventory from "./pages/AddInventory";
import Navbar from './componets/Navbar'
import Moves from "./pages/Moves";
import Edit from "./pages/Edit";
import Move from "./pages/Move";
import { Toaster } from 'react-hot-toast';
import { createContext, useEffect, useState } from "react";
import { axiosConfig, baseURL } from "./utils/axiosConfig";
import axios from "axios";

export const SubDataContext = createContext()

function App() {

  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [subplaces, setSubplaces] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchSubdata = () => {
    axios.all([axios.get(`${baseURL}app/category?order=name`, axiosConfig),
    axios.get(`${baseURL}app/place?order=name`, axiosConfig),
    axios.get(`${baseURL}app/subplace?order=name`, axiosConfig),
    axios.get(`${baseURL}app/status?order=name`, axiosConfig)]).then(axios.spread((category, place, subplace, status) => {
      setCategories(category.data)
      setPlaces(place.data)
      setSubplaces(subplace.data)
      setStatuses(status.data)
    }))
  }

  useEffect(() => {
    fetchSubdata()
  }, [])

  return (
    <BrowserRouter>
      <SubDataContext.Provider value={{categories,places,subplaces,statuses}}>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addinventory" element={<AddInventory />} />
          <Route path="/moves" element={<Moves />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/move/:id" element={<Move />} />
        </Routes>
      </SubDataContext.Provider>
    </BrowserRouter>
  );
}

export default App;

// name            method  url         body                    response

// create_item     POST    /item       {"k1":"v1","k2":"v2"}   {"id":1}
// read_item       GET     /item/<id>                          200 {"id":1,"k1":"v1","k2":"v2"}
// read_all_item   GET     /item                               200 [{"id":1,"k1":"v1","k2":"v2"},{"id":2,"k1":"v1","k2":"v2"}]
// update_item     PUT     /item/<id>  {"k2":"v2"}             200 "ok"
// delete_item     DELETE  /item/<id>                          200 "ok"

// Ромчик, [18.12.2023 9:44]
// name            method  url         body                    response

// create_item     POST    /item       {"k1":"v1","k2":"v2"}   {"id":1}
// read_item       GET     /item/<id>                          200 {"id":1,"k1":"v1","k2":"v2"}
// read_all_item   GET     /item                               200 [{"id":1,"k1":"v1","k2":"v2"},{"id":2,"k1":"v1","k2":"v2"}]
// update_item     PUT     /item/<id>  {"k2":"v2"}             200 "ok"
// delete_item     DELETE  /item/<id>                          200 "ok"

// Ромчик, [18.12.2023 9:45]
// https://inventory.dev.web.kameya.if.ua/app