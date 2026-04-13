import React from 'react'
import SchoolIcon from '@mui/icons-material/School';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';

export default function Footer() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <footer className="footer" style={{backgroundColor: colors.blueAccent[800]}}>
            <div className="footer-container">

                {/* <!-- Left Section --> */}
                <div className="footer-col" data-aos="fade-left" data-aos-duration="800" data-aos-delay="0">
                    <div className="brand">
                        <div className="logo">
                            <SchoolIcon/>
                        </div>
                        <div>
                            <h3 style={{color: colors.grey[100]}}>Evaluate It Easily</h3> 
                            <span className="subtitle" style={{color: colors.grey[300]}}>Internal Evaluation System</span>
                        </div>
                    </div>

                    <p className="description" style={{color: colors.grey[100]}}>
                        Streamlining graduation project evaluation with AI-powered
                        intelligence for university students and evaluation committees.
                    </p>

                    <div className="status">
                        <span className="dot"></span>
                        <span style={{color: colors.grey[300]}}>System Status: Operational</span>
                    </div>
                </div>

                {/* <!-- Middle Section --> */}
                <div className="footer-col" data-aos="fade-left" data-aos-duration="800" data-aos-delay="300">
                    <h4 style={{color: colors.grey[100]}}>Internal Resources</h4>
                    <ul>
                        <li style={{color: colors.grey[300]}}><i className="fa-solid fa-shield-halved"></i>Privacy Policy</li>
                        <li style={{color: colors.grey[300]}}><i className="fa-solid fa-headset"></i>IT Support</li>
                        <li style={{color: colors.grey[300]}}><i className="fa-solid fa-envelope"></i>Contact Admin</li>
                    </ul>
                </div>

                {/* <!-- Right Section --> */}
                <div className="footer-col" data-aos="fade-left" data-aos-duration="800" data-aos-delay="600">
                    <h4 style={{color: colors.grey[100]}}>System Info</h4>

                    <div className="info">
                        <span style={{color: colors.grey[100]}}>Version</span>
                        <strong style={{color: colors.grey[300]}}>v1.0.0</strong>
                    </div>

                    <div className="info">
                        <span style={{color: colors.grey[100]}}>Created In</span>
                        <strong style={{color: colors.grey[300]}}>Nov 2026</strong>
                    </div>

                    <div className="status online">
                        <span className="dot green"></span>
                        <span style={{color: colors.grey[300]}}>All Systems Online</span>
                    </div>
                </div>

            </div>
        </footer>
    )
    }
