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
      }
    }
  }
`

type Props = {
  user?: GetUserById['user']
  loading?: boolean
  error?: CellFailureProps['error']
}

const Avatar = ({ user, loading, error }: Props) => {
  const avatar = user?.profile?.avatar
  const initials = user?.profile?.firstName
    ? [
        (user?.profile.firstName || '').charAt(0).toUpperCase(),
        (user?.profile?.lastName || '').charAt(0).toUpperCase()
      ].join('')
    : user?.email?.charAt(0).toUpperCase()

  return (
    <div className="avatar placeholder h-full w-full">
      {loading ? (
        <div className="bg-primary-focus text-primary-content h-full w-full rounded-full animate-pulse"></div>
      ) : error ? (
        <div className="bg-base-100 h-full w-full rounded-full">
          <div data-tip={error.message} className="tooltip tooltip-error">
            <AiOutlineStop size={16} className="text-error" />
          </div>
        </div>
      ) : avatar ? (
        <img alt="avatar" loading="lazy" src={avatar} />
      ) : (
        <div className="bg-primary-focus text-primary-content h-full w-full rounded-full">
          {initials || 'N/A'}
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
