import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { AiOutlineStop } from 'react-icons/ai'
import type { GetUserById } from 'types/graphql'

export const QUERY = gql`
  query GetUserById($id: String!) {
    user: getUserById(id: $id) {
      id
      role
      email
      logOn
      logOff
      createdAt
      profile {
        id
        avatar
        fullName
        firstName
        lastName
        mobile
        phone
        companyId
        updatedAt
        address {
          lat
          lng
          gPlaceId
          premise
          state
          street
          suburb
          country
          postalCode
          updatedAt
          formattedAddress
        }
      }
    }
  }
`

type Props = {
  loading?: boolean
  user?: GetUserById['user']
  error?: CellFailureProps['error']
}

const Avatar = ({ user, loading, error }: Props) => {
  const avatar = user?.profile.avatar
  const initials = user
    ? user.profile.firstName
      ? [
          (user.profile.firstName || '').charAt(0).toUpperCase(),
          (user.profile.lastName || '').charAt(0).toUpperCase()
        ].join('')
      : user.email.charAt(0).toUpperCase()
    : '?'

  return (
    <div data-testid="avatar-cell" className="avatar placeholder h-full w-full">
      {loading ? (
        <div
          data-testid="avatar-cell-loading"
          className="bg-primary-focus text-primary-content h-full w-full rounded-full animate-pulse"
        ></div>
      ) : error ? (
        <div
          data-testid="avatar-cell-error"
          className="bg-base-100 h-full w-full rounded-full"
        >
          <AiOutlineStop size={16} className="text-error" />
        </div>
      ) : avatar ? (
        <img
          alt="avatar"
          src={avatar}
          loading="lazy"
          className="rounded-full"
          data-testid="avatar-cell-img"
        />
      ) : (
        <div
          data-testid="avatar-cell-initials"
          className="bg-primary-focus text-primary-content h-full w-full rounded-full"
        >
          {initials}
        </div>
      )}
    </div>
  )
}

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  }
}

export const Loading = () => <Avatar loading />

export const Empty = () => <Avatar />

export const Failure = ({ error }: CellFailureProps) => <Avatar error={error} />

export const Success = ({ user }: CellSuccessProps<GetUserById>) => (
  <Avatar user={user} />
)
