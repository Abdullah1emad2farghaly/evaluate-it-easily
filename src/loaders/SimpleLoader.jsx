import React from 'react'
import './simpleLoader.css'
export default function SimpleLoader({ loading }) {
    return (
        <div className={`parent fixed w-[100%] top-0 left-0 z-100 ${loading ? 'flex' : 'hidden'} justify-center items-center h-[100%] bg-[#0000001b]`}>
            <div className="simple-loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
                <div className="bar7"></div>
                <div className="bar8"></div>
                <div className="bar9"></div>
                <div className="bar10"></div>
                <div className="bar11"></div>
                <div className="bar12"></div>
            </div>
        </div>
    )
}
