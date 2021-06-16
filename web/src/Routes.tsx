import { useAuth } from '@redwoodjs/auth'
import { Router, Route, Set } from '@redwoodjs/router'

import MainLayout from './layouts/MainLayout/MainLayout'
import AuthorizingPage from './pages/AuthorizingPage/AuthorizingPage'

const Routes = () => (
  <Router useAuth={useAuth}>
    <Route path="/" page={LoginPage} name="login" />
    <Set wrap={MainLayout} unauthenticated="login" private={true}>
      <Route path="/about" page={AboutPage} name="about" whileLoading={AuthorizingPage} />
      <Route path="/home" page={HomePage} name="home" whileLoading={AuthorizingPage} />
    </Set>
    <Route notfound page={NotFoundPage} />
  </Router>
)

export default Routes
