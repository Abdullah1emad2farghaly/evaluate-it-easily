import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin'
import AcceptedProjects from '../pages/admin/AcceptedProjects'
import RejectedProjects from '../pages/admin/RejectedProjects'
import Analyze from '../pages/admin/Analyze'
import ManageTeams from '../pages/admin/ManageTeams'
import HistoricalProjects from '../pages/admin/HistoricalProjects'
import View from '../pages/admin/View'
import ProposalView from '../pages/admin/ProposalView'
import GroupDetails from '../pages/admin/groupDetails'
import EvaluatedProjects from '../pages/admin/EvaluatedProjects'
import Users from '../pages/admin/Users'
import Statistics from '../pages/admin/Statistics'
import PendingProjects from '../pages/admin/PendingProjects'
import AdminGuard from '../guards/AdminGuards'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminGuard />}>
        <Route path='/admin' element={<AdminLayout />}>

          <Route index element={<Dashboard />} />
          <Route path=':id' element={<ProposalView />} />

          <Route path='accepted-projects' element={<AcceptedProjects />} />
          <Route path='accepted-projects/:id' element={<ProposalView />} />

          <Route path='rejected-projects' element={<RejectedProjects />} />
          <Route path='rejected-projects/:id' element={<ProposalView />} />

          <Route path='historical-projects' element={<HistoricalProjects />} />
          <Route path='historical-projects/:id' element={<View />} />

          <Route path='pending-projects' element={<PendingProjects />} />
          <Route path='pending-projects/:id' element={<ProposalView />} />

          <Route path='manage-teams' element={<ManageTeams />} />
          <Route path='manage-teams/:id' element={<GroupDetails />} />

          <Route path='analyze/:id' element={<Analyze />} />
          <Route path='evaluated-projects' element={<EvaluatedProjects />} />
          <Route path='users' element={<Users />} />
          <Route path='statistics' element={<Statistics />} />
          
        </Route>
      </Route>
    </Routes>
  )
}
