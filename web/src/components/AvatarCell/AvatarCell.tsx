import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { AiOutlineStop } from 'react-icons/ai'
import type { GetUserById } from 'types/graphql'

export const QUERY = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      role
      email
      logOn
      logOff
      createdAt
      profile {
        avatar
        fullName
        firstName
        lastName
        mobile
        phone
        updatedAt
      }
    }
  }
`

const CELL_CLASS = 'avatar placeholder h-full w-full'
const AVATAR_CLASS = 'h-full w-full rounded-full'

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  }
}

export const Loading = () => (
  <div className={`${CELL_CLASS} animate-pulse`}>
    <div className={`bg-primary ${AVATAR_CLASS}`}></div>
  </div>
)

export const Empty = () => (
  <div className={CELL_CLASS}>
    <div className={`bg-primary-focus text-primary-content ${AVATAR_CLASS}`}>
      -
    </div>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className={`${CELL_CLASS}`}>
    <div className={`bg-base-100 ${AVATAR_CLASS}`}>
      <div data-tip={error.message} className="tooltip tooltip-error">
        <AiOutlineStop size={16} className="text-error" />
      </div>
    </div>
  </div>
)

export const Success = ({
  getUserById: { email, profile }
}: CellSuccessProps<GetUserById>) => {
  const avatar = profile?.avatar
  const initials = profile?.firstName
    ? [
        (profile.firstName || '').charAt(0).toUpperCase(),
        (profile?.lastName || '').charAt(0).toUpperCase()
      ].join('')
    : email?.charAt(0).toUpperCase()

  return (
    <div className={CELL_CLASS}>
      {avatar ? (
        <img alt="avatar" loading="lazy" src={avatar} />
      ) : (
        <div
          className={`bg-primary-focus text-primary-content ${AVATAR_CLASS}`}
        >
          {initials}
        </div>
      )}
    </div>
  )
}
