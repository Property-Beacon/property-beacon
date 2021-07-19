import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { AiOutlineStop } from 'react-icons/ai'
import type { GetCompany } from 'types/graphql'

export const QUERY = gql`
  query GetCompany($id: String!) {
    company: getCompany(id: $id) {
      id
      name
      logo
      shortName
      displayName
      website
      updatedAt
      createdAt
      profile {
        id
        companyId
        phone
        fax
        mobile
        fullName
        email
        abn
        acn
        crn
        owner
        mayor
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
  company?: GetCompany['company']
  error?: CellFailureProps['error']
}

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  }
}

const CompanyLogo = ({ company, loading, error }: Props) => (
  <div
    data-testid="company-logo-cell"
    className="avatar placeholder h-full w-full"
  >
    {loading ? (
      <div
        data-testid="company-logo-cell-loading"
        className="bg-primary-focus text-primary-content h-full w-full mask mask-squircle animate-pulse"
      ></div>
    ) : error ? (
      <div
        data-testid="company-logo-cell-error"
        className="bg-base-200 h-full w-full mask mask-squircle"
      >
        <AiOutlineStop size={16} className="text-error" />
      </div>
    ) : company?.logo ? (
      <img
        loading="lazy"
        src={company.logo}
        alt="company-logo"
        className="mask mask-squircle"
        data-testid="company-logo-cell-img"
      />
    ) : (
      <div
        data-testid="company-logo-cell-initials"
        className="bg-primary-focus text-primary-content h-full w-full mask mask-squircle"
      >
        {(
          (
            company?.displayName ||
            company?.name ||
            company?.shortName ||
            ''
          ).charAt(0) || '?'
        ).toUpperCase()}
      </div>
    )}
  </div>
)

export const Loading = () => <CompanyLogo loading />

export const Empty = () => <CompanyLogo />

export const Failure = ({ error }: CellFailureProps) => (
  <CompanyLogo error={error} />
)

export const Success = ({ company }: CellSuccessProps<GetCompany>) => {
  return <CompanyLogo company={company} />
}
