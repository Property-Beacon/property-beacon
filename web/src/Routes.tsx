import { useAuth } from '@redwoodjs/auth'
import { Router, Route, Set } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => (
  <Router useAuth={useAuth}>
    <Route path="/login" page={LoginPage} name="login" />
    <Set wrap={MainLayout} unauthenticated="login" private={true}>
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
    </Set>
    <Route notfound page={NotFoundPage} />
  </Router>
)

export default Routes
