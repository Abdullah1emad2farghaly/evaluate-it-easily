import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../pages/admin/TopBar'
import SideBar from '../pages/admin/Sidebar'
import './AdminLayout.css'
import Title from '../pages/admin/Title'

export default function AdminLayout() {
    return (
    <div className='flex lg:gap-4'>
        <div className="h-screen lg:min-w-60 min-w-0 max-w-60 z-200 relative left-0  duration-1000">
            <SideBar/>
        </div>
        <main className='relative w-full'>
            <TopBar/>
            <Outlet/>
        </main>
    </div>
    )
}
