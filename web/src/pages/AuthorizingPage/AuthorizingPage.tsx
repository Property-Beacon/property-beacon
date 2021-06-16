import { MdFingerprint } from 'react-icons/md'

const AuthorizingPage = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <div className="card px-8 py-4 shadow-xl bg-accent opacity-80 text-base-100">
      <MdFingerprint size={60} className="animate-pulse mx-auto" />
      <div className="mt-1 text-sm font-light">Checking your identity...</div>
    </div>
  </div>
)

export default AuthorizingPage
