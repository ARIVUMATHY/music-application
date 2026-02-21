import React from 'react'
import { RiMovie2AiFill } from 'react-icons/ri'
import { TiThMenu } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'

const AlbumLandingSidebar = () => {
  return (
    <aside className='basis-[22%] bg-white/30 h-[1270px] border border-[5px] border-white/70 rounded'>
        <nav className='w-full px-5 py-3'>
            <ul className='w-full flex flex-col font-semibold'>
                <li className='py-2 text-black rounded flex items-center gap-3 mb-4'>
                    <span className='text-2xl'><TiThMenu /></span>
                    <span className='text-2xl tracking-wider'>Explore</span>
                </li>
                <li>
                    <NavLink 
                        to={"/"}
                        className={(isActive)=>`${isActive ? "bg-rose-600/90 ":""} 
                        py-2 px-6 bg-rose-600/90 rounded flex items-center gap-3 cursor-pointer hover:bg-rose-500 hover:scale-110`}>
                        <span className='text-xl'><RiMovie2AiFill /></span>
                        <span className='text-lg tracking-wider'>Popular Albums</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default AlbumLandingSidebar