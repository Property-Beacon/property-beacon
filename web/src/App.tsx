import { AuthProvider, useAuth } from '@redwoodjs/auth'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { Magic } from 'magic-sdk'
import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import Routes from 'src/Routes'
import './index.css'

const m = new Magic(process.env.MAGICLINK_PUBLIC)

m.preload()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={m} type="magicLink">
      <RedwoodApolloProvider useAuth={useAuth}>
        <Routes />
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>
)

export default App
