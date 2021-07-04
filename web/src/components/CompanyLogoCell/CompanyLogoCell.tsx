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
          name
          state
          street
          suburb
          country
          postalCode
          updatedAt
        }
      }
    }
  }
`

type Props = {
  company?: GetCompany['company']
  loading?: boolean
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
  <div className="avatar placeholder h-full w-full">
    {loading ? (
      <div className="bg-primary-focus text-primary-content h-full w-full rounded-full animate-pulse"></div>
    ) : error ? (
      <div className="bg-base-100 h-full w-full rounded-full">
        <div data-tip={error.message} className="tooltip tooltip-error">
          <AiOutlineStop size={16} className="text-error" />
        </div>
      </div>
    ) : company?.logo ? (
      <img alt="company-logo" loading="lazy" src={company.logo} />
    ) : (
      <div className="bg-primary-focus text-primary-content h-full w-full rounded-full">
        {(
          (
            company?.displayName ||
            company?.name ||
            company?.shortName ||
            ''
          ).charAt(0) || 'n/a'
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
