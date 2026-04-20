import React, { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/admin/TopBar'
import '../styles/AdminLayout.css'
import Sidebar from '../components/admin/Sidebar'

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <Fragment>
            <TopBar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>
            <div className='flex lg:gap-4'>
                <div className="h-screen lg:min-w-60 min-w-0 max-w-60 z-200 relative left-0  duration-1000">
                    <Sidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>
                </div>
                <main className='relative w-full h-[85vh] mt-3'>
                    <Outlet />
                </main>
            </div>
        </Fragment>
    )
}
