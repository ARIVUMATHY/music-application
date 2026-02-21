import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaFileCirclePlus } from 'react-icons/fa6';

const AdminSidebar = () => {
  return (
    <section className='basis-[15%] h-min-[calc(100vh-70px)] bg-white/30 border rounded border-[5px] border-white/70'>
      <nav className='w-full'>
        <ul className='w-full p-6'>
          <li>
            <NavLink
              to={"create-album"}
              className={({ isActive }) =>
                `flex items-center h-[60px] bg-rose-600 hover:bg-rose-500 hover:font-bold rounded-lg text-white font-semibold text-lg
                ${isActive ? "bg-blue-600" : "bg-blue-700"}`}>
              <span className='ml-2'><FaFileCirclePlus /></span>
              <span className='text-xl mt-1 mr-1 ml-2' >Create Album</span>  
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default AdminSidebar