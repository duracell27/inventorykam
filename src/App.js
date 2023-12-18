import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInventory from "./pages/AddInventory";
import Navbar from './componets/Navbar'
import Moves from "./pages/Moves";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addinventory" element={<AddInventory />} />
        <Route path="/moves" element={<Moves />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
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