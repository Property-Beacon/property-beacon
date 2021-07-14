import { useAuth } from '@redwoodjs/auth'
import { Private, Route, Router, Set } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'
import SettingsPageLoading from './pages/SettingsPage/SettingsPageLoading'

const Routes = () => (
  <Router useAuth={useAuth}>
    <Set wrap={MainLayout}>
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      </Private>
      <Private unauthenticated="home" whileLoadingAuth={SettingsPageLoading}>
        <Route path="/settings/{name}" page={SettingsPage} name="settings" whileLoadingPage={SettingsPageLoading} />
      </Private>
    </Set>
    <Route notfound page={NotFoundPage} />
  </Router>
)

export default Routes
