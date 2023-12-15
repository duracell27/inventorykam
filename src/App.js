import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddInventory from "./pages/AddInventory";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addinventory" element={<AddInventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
