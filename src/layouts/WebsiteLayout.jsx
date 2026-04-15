import React from 'react'
import '../styles/WebsiteLayout.css';
import { Outlet } from 'react-router-dom';
export default function WebsiteLayout() {
    return (
        <main className='content'>
            <Outlet/>
        </main>
    )
}
