import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../pages/admin/TopBar'
import SideBar from '../pages/admin/Sidebar'
import './AdminLayout.css'
import Title from '../pages/admin/Title'

export default function AdminLayout() {
    return (
    <div className='grid grid-cols-12 relative gap-10 lg:p-4 lg:pl-6 pt-0'>
        <div className="col-span-2 relative">
            <SideBar/>
        </div>
        <main className='relative lg:col-span-10 col-span-12'>
            <TopBar/>
            <Outlet/>
        </main>
    </div>
    )
}
