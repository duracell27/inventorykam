import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-yellow-50'>
      <nav className='flex items-center justify-between p-2 py-2'>
        <div className="logo">
          <p className='text-3xl text-red-950 '>Інвентар Камея</p>
        </div>
        <div className="menu ">
          <ul className='flex items-center justify-around gap-3'>
            <li className='bg-red-950 p-2 px-4 text-lg text-white rounded-full cursor-pointer text-center'>
              <Link to={'/'}>Дашборд</Link>
            </li>
            <li className='bg-red-950 p-2 px-4 text-lg text-white rounded-full cursor-pointer text-center'>
              <Link to={'/addinventory'}>Додати елемент</Link>
            </li>
            <li className='bg-red-950 p-2 px-4 text-lg text-white rounded-full cursor-pointer text-center'>
              <Link to={'/moves'}>Переміщення</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar