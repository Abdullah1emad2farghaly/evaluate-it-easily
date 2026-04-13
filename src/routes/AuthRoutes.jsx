import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Auth from '../pages/auth/Auth'
import AuthGuard from './AuthGuards'
import VerifyAccount from '../pages/auth/VeryfyAccount'

export default function AuthRoutes() {
    return (
        <Routes>
            <Route element={<AuthGuard />}>
                <Route path='/auth' element={<AuthLayout />}>
                    <Route index element={<Auth />} />
                    <Route path='emailConfirmation' element={<VerifyAccount />} />
                </Route>
            </Route>
        </Routes>
    )
}
