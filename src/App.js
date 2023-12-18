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
        <Route path="/edit/:name" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
