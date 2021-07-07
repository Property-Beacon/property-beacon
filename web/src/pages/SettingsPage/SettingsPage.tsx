import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { NavLink, routes, useParams } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { RiAdminLine } from 'react-icons/ri'
import AvatarCell, { QUERY } from 'src/components/AvatarCell'
import DateTimeString from 'src/components/DateTimeString'
import type {
  GetUserById,
  GetUserByIdVariables,
  MakeOptional
} from 'web/types/graphql'
import OrganizationCard from './OrganizationCard'
import ProfileCard from './ProfileCard'

type UserData = MakeOptional<GetUserById['user'], 'profile'>

const SettingsPage = () => {
  // Only unique fields are reliable from currentUser
  const {
    hasRole,
    currentUser: { roles: _, ...currentUser }
  } = useAuth()
  const { name } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserData>(currentUser)
  const { watchQuery } = useApolloClient()
  const commonTabs = ['profile']
  const tabs = hasRole(['ADMIN', 'CUSTOMER', 'CLIENT'])
    ? [...commonTabs, 'organization']
    : commonTabs

  useEffect(
    () => {
      watchQuery<GetUserById, GetUserByIdVariables>({
        query: QUERY,
        variables: { id: currentUser.id },
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first'
      }).subscribe(({ loading, data: { user: userData } }) => {
        setLoading(loading)
        setUser(userData)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div>
      <div className="card shadow-lg bg-base-100 max-w-2xl">
        <div className="flex-col-reverse sm:flex-row place-items-center gap-6 card-body">
          <div className="flex-grow text-center sm:text-left">
            {loading ? (
              <div className="bg-base-300 animate-pulse h-9 mb-3 rounded w-1/2"></div>
            ) : (
              <div className="card-title text-3xl font-bold">
                {user.profile?.fullName ?? '-'}
              </div>
            )}
            <div className="flex place-items-center flex-col-reverse sm:flex-row gap-1">
              <div className="badge badge-ghost badge-lg">{user.email}</div>
              <div className="flex place-items-center text-success text-sm font-semibold">
                <RiAdminLine size={20} />
                {user.role}
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-5">
              <div className="flex place-items-center">
                <div className="mr-0.5">Updated on</div>
                {loading ? (
                  <div className="bg-base-300 animate-pulse h-5 rounded w-44"></div>
                ) : (
                  <>
                    {user.profile?.updatedAt ? (
                      <DateTimeString date={user.profile.updatedAt} />
                    ) : (
                      '-'
                    )}
                  </>
                )}
              </div>
              <div>
                Joined Property Beacon on{' '}
                <DateTimeString
                  date={currentUser.createdAt}
                  options={{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-32 h-32 mx-auto text-5xl">
            <AvatarCell id={currentUser.id} />
          </div>
        </div>
      </div>
      <div className="tabs mt-14">
        {tabs.map((name) => (
          <NavLink
            key={name}
            activeClassName="border-primary font-bold text-neutral"
            className="tab tab-bordered text-lg font-semibold capitalize"
            to={routes.settings({ name })}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <div className="mt-4">
        {name === 'profile' && <ProfileCard user={user} />}
        {name === 'organization' &&
          tabs.includes(name) &&
          !!user.profile?.companyId && (
            <OrganizationCard companyId={user.profile.companyId} />
          )}
      </div>
    </div>
  )
}

export default SettingsPage
