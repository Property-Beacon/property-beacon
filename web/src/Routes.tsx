import { useAuth } from '@redwoodjs/auth'
import { Private, Route, Router, Set } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => (
  <Router useAuth={useAuth}>
    <Set wrap={MainLayout}>
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/settings/{name}" page={SettingsPage} name="settings" />
      </Private>
    </Set>
    <Route notfound page={NotFoundPage} />
  </Router>
)

export default Routes
