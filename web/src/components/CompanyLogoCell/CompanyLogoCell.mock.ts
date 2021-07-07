import type { GetCompany } from 'web/types/graphql'

type CompanyMock = Pick<
  GetCompany['company'],
  'displayName' | 'shortName' | 'name' | 'logo'
>

// Define your own mock data here:
export const standard = ({
  name = '',
  logo = '',
  displayName = '',
  shortName = ''
}: CompanyMock) =>
  ({
    company: {
      name,
      logo,
      shortName,
      displayName
    }
  } as GetCompany)
