import { useAuth } from '@redwoodjs/auth'
import type { UserProfile } from 'api/types/graphql'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar: React.FC<Props> = ({ children, className, ...rest }) => {
  const { currentUser } = useAuth()
  const userProfile = (currentUser?.profile || {}) as UserProfile
  const avatar = userProfile?.avatar
  const isPlaceholder = !children && !avatar
  const initials = userProfile?.firstName
    ? [userProfile.firstName ?? '', userProfile?.lastName ?? '']
        .map((str) => str.charAt(0).toUpperCase())
        .join('')
    : ((currentUser.email as string) ?? '').charAt(0).toUpperCase()

  return (
    <div className={`avatar ${isPlaceholder && 'placeholder'}`}>
      <div
        className={`${
          isPlaceholder && 'bg-primary-focus text-primary-content'
        } ${className}`}
        {...rest}
      >
        {children ? (
          children
        ) : avatar ? (
          <img alt="avatar" loading="lazy" src={avatar} />
        ) : (
          <span className="text-sm">{initials}</span>
        )}
      </div>
    </div>
  )
}

export default Avatar
