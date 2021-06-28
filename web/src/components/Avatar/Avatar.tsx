import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import type { QueryGetUserByIdArgs, User } from 'api/types/graphql'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const USE_QUERY = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      email
      profile {
        avatar
        fullName
        firstName
        lastName
        mobile
        phone
      }
    }
  }
`

const Avatar: React.FC<Props> = ({ children, className, ...rest }) => {
  const { currentUser } = useAuth()
  const { data, loading } = useQuery<
    { getUserById: User },
    QueryGetUserByIdArgs
  >(USE_QUERY, { variables: { id: currentUser.id }, skip: !!children })
  const profile = data?.getUserById?.profile
  const avatar = profile?.avatar
  const initials = profile?.firstName
    ? [
        (profile.firstName || '').charAt(0).toUpperCase(),
        (profile?.lastName || '').charAt(0).toUpperCase()
      ].join('')
    : currentUser.email.charAt(0).toUpperCase()
  const isPlaceholder = !children && !avatar

  return (
    <div
      className={`avatar ${
        loading ? 'placeholder animate-pulse' : isPlaceholder && 'placeholder'
      }`}
    >
      <div
        className={`${
          isPlaceholder && 'bg-primary-focus text-primary-content'
        } ${className}`}
        {...rest}
      >
        {children ? (
          children
        ) : loading ? null : avatar ? (
          <img alt="avatar" loading="lazy" src={avatar} />
        ) : (
          <span className="text-sm">{initials}</span>
        )}
      </div>
    </div>
  )
}

export default Avatar
