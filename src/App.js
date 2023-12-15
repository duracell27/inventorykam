import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInventory from "./pages/AddInventory";
import Navbar from './componets/Navbar'
import Moves from "./pages/Moves";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addinventory" element={<AddInventory />} />
        <Route path="/moves" element={<Moves />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
