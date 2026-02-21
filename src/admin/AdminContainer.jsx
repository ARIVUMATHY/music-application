import React from 'react'
import AdminSidebar from "../admin/AdminSidebar";
import AdminContent from "../admin/AdminContent";

const AdminContainer = () => {
  return (
    <section className='flex'> 
      <AdminSidebar/>
      <AdminContent/>
    </section>
  )
}

export default AdminContainer