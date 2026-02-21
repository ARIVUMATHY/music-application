import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminContent = () => {
  return (
    <aside>
      <Outlet/>
    </aside>
  )
}

export default AdminContent