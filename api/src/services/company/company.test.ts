import { getCompanyProfile } from '../companyProfile/companyProfile'
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany
} from './company'

describe('services/company', () => {
  let companyId = ''
  let updatedAt = new Date()
  const current = new Date()

  const data = {
    name: 'Test Company',
    shortName: 'TC',
    displayName: 'Test Company Pty Ltd.',
    website: 'https://www.tc.com.au'
  }

  beforeEach(async () => {
    const company = await createCompany({
      data
    })

    companyId = company.id
    updatedAt = company.updatedAt
  })

  it('createCompany -> getCompany', async () => {
    const company = await getCompany({ id: companyId })

    expect(company.id).not.toBeNull()
    expect(company.name).toEqual(data.name)
    expect(company.shortName).toEqual(data.shortName)
    expect(company.displayName).toEqual(data.displayName)
    expect(company.website).toEqual(data.website)
    expect(company.createdAt).toBeInstanceOf(Date)
    expect(new Date(company.createdAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
    expect(company.updatedAt).toBeInstanceOf(Date)
    expect(new Date(company.updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )

    const companyProfile = await getCompanyProfile({ companyId: company.id })

    expect(companyProfile.id).not.toBeNull()
    expect(companyProfile.updatedAt).toBeInstanceOf(Date)
    expect(new Date(companyProfile.updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
  })

  it('getCompanies', async () => {
    const companies = await getCompanies()

    expect(companies).toHaveLength(1)
    expect(companies[0].id).toEqual(companyId)
  })

  it('updateCompany', async () => {
    const newData = {
      name: 'Test Company 2',
      website: 'https://www.tc2.com.au'
    }
    const company = await updateCompany({ id: companyId, ...newData })

    expect(company.name).toEqual(newData.name)
    expect(company.shortName).toEqual(data.shortName)
    expect(company.displayName).toEqual(data.displayName)
    expect(company.website).toEqual(newData.website)
    expect(new Date(company.updatedAt).getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime()
    )
  })

  it('deleteCompany', async () => {
    expect(await deleteCompany({ id: companyId })).toBeTruthy()

    const company = await getCompany({ id: companyId })
    const companyProfile = await getCompanyProfile({ companyId })

    expect(company).toBeNull()
    // Ensure companyProfile is deleted as well due to DB relation
    expect(companyProfile).toBeNull()
  })
})
