import { useApolloClient, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { NavLink, routes, useParams } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { RiAdminLine } from 'react-icons/ri'
import AvatarCell, { QUERY } from 'src/components/AvatarCell'
import DateTimeString from 'src/components/DateTimeString'
import ImageUploaderOverlay, {
  FailedFile
} from 'src/components/ImageUploaderOverlay'
import { useMainLayoutContext } from 'src/layouts/MainLayout'
import type {
  GetUserById,
  GetUserByIdVariables,
  MakeOptional,
  UpdateUserProfile,
  UpdateUserProfileVariables
} from 'web/types/graphql'
import OrganizationCard from './OrganizationCard'
import ProfileCard, { MUTATION } from './ProfileCard'
import TabContentLoading from './TabContentLoading'

type UserData = MakeOptional<GetUserById['user'], 'profile'>

const SettingsPage = () => {
  // Only unique fields are reliable from currentUser
  const {
    hasRole,
    currentUser: { roles: _, ...currentUser }
  } = useAuth()
  const { name } = useParams()
  const [loading, setLoading] = useState(true)
  const [showUploader, setShowUploader] = useState(false)
  const [user, setUser] = useState<UserData>(currentUser)
  const { watchQuery } = useApolloClient()
  const { setAlert } = useMainLayoutContext()
  const commonTabs = ['profile']
  const tabs = hasRole(['ADMIN', 'CUSTOMER', 'CLIENT'])
    ? [...commonTabs, 'organization']
    : commonTabs
  const [updateProfile, { loading: updating }] = useMutation<
    UpdateUserProfile,
    UpdateUserProfileVariables
  >(MUTATION, {
    onCompleted: () => {
      setShowUploader(false)
    }
  })

  const handleUploadSuccess = (urls: string[]) => {
    updateProfile({ variables: { userId: user.id, data: { avatar: urls[0] } } })
  }

  const handleUploadError = (error: FailedFile[]) => {
    setAlert({ level: 'error', message: error[0].message })
  }

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
    <>
      <div>
        <div className="card shadow-lg bg-base-100 max-w-2xl">
          <div className="flex-col-reverse sm:flex-row place-items-center gap-6 card-body">
            <div className="flex-grow text-center sm:text-left">
              {loading || updating ? (
                <div className="bg-base-300 animate-pulse h-9 mb-3 rounded w-1/2 mx-auto sm:mx-0"></div>
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
            <div
              data-tip="Click to upload photo"
              className="tooltip tooltip-primary"
            >
              <button disabled={updating} onClick={() => setShowUploader(true)}>
                <div className="w-32 h-32 mx-auto text-5xl">
                  <AvatarCell id={currentUser.id} />
                </div>
              </button>
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
        {/* A workaround of Filestack uploader stacking issue */}
        <div className={`mt-4 ${showUploader && 'opacity-95'}`}>
          {name === 'profile' && <ProfileCard user={user} />}
          {name === 'organization' && tabs.includes(name) && loading ? (
            <TabContentLoading />
          ) : (
            !!user.profile?.companyId && (
              <OrganizationCard companyId={user.profile.companyId} />
            )
          )}
        </div>
      </div>
      {showUploader && (
        <ImageUploaderOverlay
          onError={handleUploadError}
          onSuccess={handleUploadSuccess}
          onClose={() => setShowUploader(false)}
        />
      )}
    </>
  )
}

export default SettingsPage
