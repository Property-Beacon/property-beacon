import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import type { QueryGetUserByIdArgs, User } from 'api/types/graphql'
import { MouseEvent } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import Avatar, { USE_QUERY } from 'src/components/Avatar/Avatar'

const MainLayout: React.FunctionComponent = ({ children }) => {
  const {
    loading: authorizing,
    logOut,
    currentUser,
    isAuthenticated
  } = useAuth()
  const { data, loading } = useQuery<
    { getUserById: User },
    QueryGetUserByIdArgs
  >(USE_QUERY, { skip: !currentUser?.id, variables: { id: currentUser?.id } })
  const userProfile = data?.getUserById?.profile

  const handleLogOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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
        <Link to={routes.home()}>
          <img
            width={36}
            height={36}
            loading="lazy"
            alt="Property Beacon"
            src="/images/icons/icon-128x128.png"
          />
        </Link>
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
          {loading || authorizing ? (
            <button className="btn btn-sm btn-ghost rounded-btn loading text-gray-500">
              Loading
            </button>
          ) : isAuthenticated ? (
            <>
              <Link
                to={routes.dashboard()}
                className="btn btn-ghost btn-sm rounded-btn"
              >
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="pl-2 dropdown dropdown-end">
                <button tabIndex={0} className="flex items-center">
                  <Avatar className="rounded-full w-8 h-8" />
                  <RiArrowDownSLine size={20} />
                </button>
                <ul className="menu shadow-lg dropdown-content bg-base-100 rounded-box w-60 mt-4 text-neutral">
                  <li>
                    <Link to={routes.settings()} className="flex-col">
                      <div className="flex w-full">
                        <span className="font-bold flex-1">
                          {userProfile?.fullName || '-'}
                        </span>
                        <span className="badge badge-accent badge-sm my-auto">
                          {currentUser.role}
                        </span>
                      </div>
                      <div className="flex w-full">
                        <span className="flex-1 text-sm font-light text-left break-all">
                          {currentUser.email}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <a href="/" onClick={handleLogOut}>
                      <FiLogOut size={20} />
                      <span className="ml-2">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <main className="layout-content">{children}</main>
    </div>
  )
}

export default MainLayout
