import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'
import {
  createContext,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { FiBell, FiLogOut, FiMenu } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'
import AvatarCell, { QUERY } from 'src/components/AvatarCell'
import type { GetUserById, GetUserByIdVariables } from 'web/types/graphql'
import MainLayoutAlert, { MainLayoutAlertType } from './MainLayoutAlert'

export type MainLayoutContextType = {
  alert?: MainLayoutAlertType
  setAlert?: Dispatch<SetStateAction<MainLayoutAlertType>>
}

const MainLayoutContext = createContext<MainLayoutContextType>({})
const useMainLayoutContext = () => useContext(MainLayoutContext)

const MainLayout: React.FunctionComponent = ({ children }) => {
  const [fullName, setFullName] = useState('')
  const [alert, setAlert] = useState<MainLayoutAlertType>()
  const { watchQuery } = useApolloClient()
  const {
    loading: authorizing,
    logOut,
    hasRole,
    currentUser, // Only unique fields are reliable from currentUser
    isAuthenticated
  } = useAuth()

  // A workaround of click and focus behavior not working on Safari
  // https://gist.github.com/cvrebert/68659d0333a578d75372
  const handleClickFocus = (e: MouseEvent<HTMLButtonElement>) => {
    // Set button focus onClick since button can NOT be focused by clicking (even with tabindex)
    e.currentTarget.focus()
  }

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
    <MainLayoutContext.Provider value={{ alert, setAlert }}>
      <div className="p-3">
        <div className="navbar shadow-lg bg-neutral text-base-300 rounded-box py-3 px-4 sm:px-6">
          <Link to={routes.home()} className="h-9" data-testid="navbar-logo">
            <img
              width={36}
              height={36}
              loading="lazy"
              alt="Property Beacon"
              src="/images/icons/icon-128x128.png"
            />
          </Link>
          <div className="flex-1 justify-end">
            <div className="hidden md:block">
              <Link
                to={routes.home()}
                className="btn btn-ghost btn-sm rounded-btn"
              >
                <span>Regulation</span>
              </Link>
              {hasRole(['ADMIN', 'CUSTOMER', 'CLIENT']) && (
                <Link
                  to={routes.home()}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <span>Booking</span>
                </Link>
              )}
              {hasRole(['ADMIN', 'USER', 'CLIENT']) && (
                <Link
                  to={routes.home()}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <span>Incident</span>
                </Link>
              )}
              {hasRole(['ADMIN', 'CLIENT', 'CUSTOMER']) && (
                <Link
                  to={routes.home()}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <span>Enforcement</span>
                </Link>
              )}
              {hasRole(['ADMIN', 'CLIENT', 'CUSTOMER']) && (
                <Link
                  to={routes.home()}
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <span>Members</span>
                </Link>
              )}
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
                  className="btn btn-ghost btn-sm rounded-btn hidden sm:flex"
                >
                  <span>Dashboard</span>
                </NavLink>
                <div className="flex dropdown dropdown-end">
                  <button
                    onClick={handleClickFocus}
                    className="avatar online mx-2"
                  >
                    <FiBell size={22} className="self-center" />
                  </button>
                  <ul className="menu shadow-lg dropdown-content bg-base-100 rounded-box w-80 mt-12 text-neutral">
                    <li className="text-xs">
                      <span>New report from user Brian liu!</span>
                    </li>
                    <li className="text-xs">
                      <span>
                        Ray White has paid the booking fee on{' '}
                        {new Date().toLocaleString()}
                      </span>
                    </li>
                    <li className="text-xs">
                      <span>New signage report from Peter!</span>
                    </li>
                    <li className="text-xs">
                      <span>
                        Ray White has paid their booking fee on{' '}
                        {new Date().toLocaleString()}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pl-2 dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    onClick={handleClickFocus}
                    className="flex items-center"
                    data-testid="navbar-user-avatar"
                  >
                    <div className="rounded-full w-8 h-8 text-sm">
                      <AvatarCell id={currentUser?.id} />
                    </div>
                    <RiArrowDownSLine size={20} />
                  </button>
                  <ul
                    data-testid="navbar-menu"
                    className="menu shadow-lg dropdown-content bg-base-100 rounded-box w-60 mt-4 text-neutral"
                  >
                    <li>
                      <NavLink
                        // A workaround for Safari as anchor support focus and click ONLY when the anchor has a tabindex
                        tabIndex={0}
                        className="flex-col"
                        data-testid="navbar-menu-user"
                        activeClassName="bg-primary-focus"
                        to={routes.settings({ name: 'profile' })}
                      >
                        <div className="flex w-full">
                          <span
                            data-testid="navbar-menu-user-fullname"
                            className="font-bold flex-1"
                          >
                            {fullName || 'n/a'}
                          </span>
                          <span
                            data-testid="navbar-menu-user-role"
                            className="badge badge-accent badge-sm my-auto"
                          >
                            {currentUser?.role || 'n/a'}
                          </span>
                        </div>
                        <div className="flex w-full">
                          <span
                            data-testid="navbar-menu-user-email"
                            className="flex-1 text-sm font-light text-left break-all"
                          >
                            {currentUser?.email || 'n/a'}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="/"
                        // A workaround for Safari as anchor support focus and click ONLY when the anchor has a tabindex
                        tabIndex={0}
                        onClick={handleLogOut}
                        data-testid="navbar-menu-logout"
                      >
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
        <main className="layout-content relative">
          <MainLayoutAlert />
          {children}
        </main>
      </div>
    </MainLayoutContext.Provider>
  )
}

export { MainLayout as default, useMainLayoutContext }
