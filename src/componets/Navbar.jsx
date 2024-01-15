import React, { useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import MenuIcon from "./icons/MenuIcon";

const Navbar = () => {
    const [showMenu, setShowmenu] = useState(false)
    
  return (
    <div className="bg-yellow-50">
      <nav className="flex items-center justify-between p-2 py-2 relative">
        <div className="logo">
          <p className="text-3xl text-red-950 ">
            <Link to={"/Не вибрано/Всі"}>Інвентар Камея</Link>
          </p>
        </div>
        <div onClick={()=>setShowmenu(!showMenu)} className="menubtn md:hidden"><MenuIcon/></div>
        <div className={`menu md:border-0 border border-red-950 rounded-md md:static md:w-auto absolute right-2 top-14 bg-yellow-100 md:bg-yellow-50 z-20 md:p-0 p-2 w-fit  ${showMenu? 'block':'display-none'} md:block`}>
          <ul className="md:flex items-center justify-around gap-3">
            <li className="flex justify-end px-2 md:px-0 md:my-0 my-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navLink__active" : "navLink"
                }
                to={"/Не вибрано/Всі"}
              >
                Дашборд
              </NavLink>
            </li>
            <li className="flex justify-end px-2 md:px-0 md:my-0 my-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navLink__active" : "navLink"
                }
                to={"/addinventory"}
              >
                Додати елемент
              </NavLink>
            </li>
            <li className="flex justify-end px-2 md:px-0 md:my-0 my-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navLink__active" : "navLink"
                }
                to={"/moves"}
              >
                Зміни обладнання
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
