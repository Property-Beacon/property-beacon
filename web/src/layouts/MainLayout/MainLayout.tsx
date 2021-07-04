import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'
import { MouseEvent, useEffect, useState } from 'react'
import { FiBell, FiLogOut, FiMenu } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import AvatarCell, { QUERY } from 'src/components/AvatarCell'
import type { GetUserById, GetUserByIdVariables } from 'web/types/graphql'

const MainLayout: React.FunctionComponent = ({ children }) => {
  const [fullName, setFullName] = useState('')
  const { watchQuery } = useApolloClient()
  const {
    loading: authorizing,
    logOut,
    currentUser, // Only unique fields are reliable from currentUser
    isAuthenticated
  } = useAuth()

  useEffect(
    () => {
      if (currentUser?.id && !fullName) {
        watchQuery<GetUserById, GetUserByIdVariables>({
          query: QUERY,
          variables: { id: currentUser.id },
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first'
        }).subscribe(
          ({
            data: {
              user: { profile }
            }
          }) => {
            if (profile?.fullName) {
              setFullName(profile.fullName)
            }
          }
        )
      }
    },
    // MainLayout is rendered before authentication response, so need to watch currentUser changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser?.id, fullName]
  )

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
        <Link to={routes.home()} className="h-9">
          <img
            width={36}
            height={36}
            loading="lazy"
            alt="Property Beacon"
            src="/images/icons/icon-128x128.png"
          />
        </Link>
        <div className="flex-1 justify-end">
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
          {authorizing ? (
            <button className="btn btn-sm btn-ghost rounded-btn loading text-gray-500">
              Loading
            </button>
          ) : isAuthenticated ? (
            <>
              <NavLink
                to={routes.dashboard()}
                activeClassName="text-primary"
                className="btn btn-ghost btn-sm rounded-btn hidden sm:inline"
              >
                <span>Dashboard</span>
              </NavLink>
              <div className="flex dropdown dropdown-end">
                <button className="avatar online mx-2">
                  <FiBell size={22} className="self-center" />
                </button>
                <ul className="menu shadow-lg dropdown-content bg-base-100 rounded-box w-80 mt-12 text-neutral">
                  <li className="text-xs">
                    <a>New report from user Brian liu!</a>
                  </li>
                  <li className="text-xs">
                    <a>
                      Ray White has paid the booking fee on{' '}
                      {new Date().toLocaleString()}
                    </a>
                  </li>
                  <li className="text-xs">
                    <a>New signage report from Peter!</a>
                  </li>
                  <li className="text-xs">
                    <a>
                      Ray White has paid their booking fee on{' '}
                      {new Date().toLocaleString()}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pl-2 dropdown dropdown-end">
                <button tabIndex={0} className="flex items-center">
                  <div className="rounded-full w-8 h-8 text-sm">
                    <AvatarCell id={currentUser?.id} />
                  </div>
                  <RiArrowDownSLine size={20} />
                </button>
                <ul className="menu shadow-lg dropdown-content bg-base-100 rounded-box w-60 mt-4 text-neutral">
                  <li>
                    <NavLink
                      to={routes.settings({ name: 'profile' })}
                      className="flex-col"
                      activeClassName="bg-primary-focus"
                    >
                      <div className="flex w-full">
                        <span className="font-bold flex-1">
                          {fullName || 'n/a'}
                        </span>
                        <span className="badge badge-accent badge-sm my-auto">
                          {currentUser?.role || 'n/a'}
                        </span>
                      </div>
                      <div className="flex w-full">
                        <span className="flex-1 text-sm font-light text-left break-all">
                          {currentUser?.email || 'n/a'}
                        </span>
                      </div>
                    </NavLink>
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
          ) : (
            <>
              <button className="btn btn-sm btn-ghost sm:hidden">
                <FiMenu size={22} />
              </button>
            </>
          )}
        </div>
      </div>
      <main className="layout-content">{children}</main>
    </div>
  )
}

export default MainLayout
