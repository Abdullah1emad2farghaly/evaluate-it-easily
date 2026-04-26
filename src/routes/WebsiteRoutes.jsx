import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WebsiteLayout from '../layouts/WebsiteLayout'
import Home from '../pages/website/Home'

import CreateGroup from '../pages/website/CreateGroup'
import CreateProposal from '../pages/website/CreateProposal'
import Similarity from '../pages/website/Similarity'
import Notifications from '../pages/website/Notifications'
import DashboardLayout from '../layouts/DashboardLayout'

import WebsiteGuard from '../guards/WebsiteGuards'
import ProposalCard from '../pages/website/ProposalCard'
import MyInvitations from '../pages/website/MyInvitations'
import GroupInvitations from '../pages/website/GroupInvitations'

export default function WebsiteRoutes() {
    return (
        <Routes>
            <Route path='/' element={<WebsiteLayout />}>
                <Route index element={<Home />} />
            </Route>
            <Route element={<WebsiteGuard />}>
                <Route path='/' element={<WebsiteLayout />}>
                    <Route path='dashboard' element={<DashboardLayout />}>
                        <Route index element={<CreateGroup />} />
                        <Route path='create-proposal' element={<CreateProposal />} />
                        <Route path='my-proposal' element={<ProposalCard />} />
                        <Route path='similarity' element={<Similarity />} />
                        <Route path='my-invitations' element={<MyInvitations />} />
                        <Route path='group-invitations' element={<GroupInvitations />} />
                        <Route path='notifications' element={<Notifications />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}
