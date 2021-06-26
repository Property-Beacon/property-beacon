import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MouseEvent } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'

const MainLayout: React.FunctionComponent = ({ children }) => {
  const { loading, logOut, isAuthenticated } = useAuth()

  const handleLogOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    logOut()
      .then()
      .catch((error) => {
        // TODO logging
        console.error(error)
      })
  }

  return (
    <div className="p-3">
      <div className="navbar shadow-lg bg-neutral text-base-300 rounded-box py-3 px-4 sm:px-6">
        <img
          width={36}
          height={36}
          loading="lazy"
          alt="Property Beacon"
          src="/images/icons/icon-128x128.png"
        />
        <div className="flex-1 justify-end gap-1">
          <div className="hidden sm:block">
            <Link
              to={routes.home()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <span>Blog</span>
            </Link>
            <Link
              to={routes.home()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <span>Help</span>
            </Link>
            <Link
              to={routes.home()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <span>About</span>
            </Link>
          </div>
          {loading ? (
            <button className="btn btn-sm btn-ghost rounded-btn loading text-gray-500">
              Loading
            </button>
          ) : isAuthenticated ? (
            <>
              <Link
                to={routes.dashboard()}
                className="btn btn-ghost btn-sm rounded-btn"
              >
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center pl-2">
                <div className="rounded-full w-8 h-8 mr-1 overflow-hidden">
                  <img
                    alt="avatar"
                    src="http://daisyui.com/tailwind-css-component-profile-1@56w.png"
                  />
                </div>
                <RiArrowDownSLine size={20} />
              </div>
              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-square btn-ghost"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : null}
        </div>
      </div>
      <main className="layout-content">{children}</main>
    </div>
  )
}

export default MainLayout
