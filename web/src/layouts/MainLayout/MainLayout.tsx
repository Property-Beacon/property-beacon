import { useAuth } from '@redwoodjs/auth'
import { FiLogOut } from 'react-icons/fi'
import { useState, MouseEvent, useEffect } from 'react'
import { Link, routes } from '@redwoodjs/router'

const MainLayout: React.FunctionComponent = ({ children }) => {
  const { loading, logOut } = useAuth()
  const [isLoading, setIsLoading] = useState(loading)

  const handleLogOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsLoading(true)

    logOut()
      .then()
      .catch((error) => {
        // TODO logging
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return (
    <div className="grid grid-cols-1 gap-6 p-2 lg:p-6 xl:grid-cols-3 lg:bg-base-200 rounded-box">
      <div className="navbar col-span-1 shadow-lg xl:col-span-3 bg-neutral-focus text-neutral-content rounded-box">
        <div className="pl-4 pr-2">
          <img
            width={24}
            height={24}
            loading="lazy"
            alt="Property Beacon"
            src="/images/icons/icon-128x128.png"
          />
        </div>
        <div className="flex-none hidden sm:block">
          <span className="text-lg text-accent font-bold">Property Beacon</span>
        </div>
        <div className="flex justify-end sm:justify-center flex-1 px-2 mx-2">
          <div className="items-stretch flex">
            <Link
              to={routes.home()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <span>Home</span>
            </Link>
            <Link
              to={routes.about()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <span>About</span>
            </Link>
          </div>
        </div>
        <div className="flex-none">
          <button
            disabled={isLoading}
            onClick={handleLogOut}
            className="btn btn-square btn-ghost"
          >
            <FiLogOut size={24} />
          </button>
        </div>
      </div>
      <main className="col-span-1 xl:col-span-3">{children}</main>
    </div>
  )
}

export default MainLayout
