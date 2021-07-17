import { getAddressByCompanyProfileId } from '../address/address'
import { createCompany, getCompany } from '../company/company'
import {
  deleteCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile
} from './companyProfile'

describe('services/companyProfile', () => {
  let companyId = ''
  let updatedAt = new Date()

  const data = {
    name: 'Test Company 3',
    shortName: 'TC3',
    displayName: 'Test Company 3 Pty Ltd.',
    website: 'https://www.tc3.com.au'
  }

  beforeEach(async () => {
    const company = await createCompany({
      data
    })

    companyId = company.id
    updatedAt = company.updatedAt
  })

  it('getCompanyProfile', async () => {
    const {
      id,
      companyId: _,
      updatedAt: _updatedAt,
      ...rest
    } = await getCompanyProfile({ companyId })

    expect(id).not.toBeNull()
    expect(new Date(_updatedAt).getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime()
    )
    expect(rest).toEqual({
      abn: null,
      acn: null,
      crn: null,
      fullName: null,
      phone: null,
      mobile: null,
      fax: null,
      email: null,
      owner: null,
      mayor: null
    })
  })

  it('updateCompanyProfile', async () => {
    const companyProfileData = {
      abn: 'abn123456789',
      acn: 'acn123456789',
      crn: 'crn123456789',
      fullName: 'Text Company 3 Pty Ltd Australia',
      phone: '0412345678',
      mobile: '0222222222',
      fax: '0333333333',
      email: 'company@domain.com',
      owner: 'David Jones',
      mayor: 'David Jones Jr.'
    }
    const data = {
      ...companyProfileData,
      address: {
        country: 'Australia',
        state: 'NSW',
        suburb: 'Crows Nest',
        postalCode: '2200',
        street: 'Albany Street',
        premise: 'Unit 2',
        formattedAddress: '2024 North Old Bastrop Highway, San Marcos, TX, USA'
      }
    }
    const {
      id: _,
      companyId: __,
      address: {
        id: ___,
        companyProfileId: ____,
        userProfileId: _____,
        updatedAt: addressUpdatedAt,
        ...address
      },
      updatedAt: companyProfileUpdatedAt,
      ...updatedCompanyProfile
    } = await updateCompanyProfile({ companyId, data })

    expect(updatedCompanyProfile).toEqual(companyProfileData)
    expect(address).toEqual(data.address)
    expect(new Date(companyProfileUpdatedAt).getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime()
    )
    expect(new Date(addressUpdatedAt).getTime()).toBeGreaterThanOrEqual(
      updatedAt.getTime()
    )
  })

  it('deleteCompanyProfile', async () => {
    expect(await deleteCompanyProfile({ companyId })).toBeTruthy()
    expect(await getCompany({ id: companyId })).not.toBeNull()
    expect(await getCompanyProfile({ companyId })).toBeNull()
    // Ensure address is deleted as well due to DB relation
    expect(
      await getAddressByCompanyProfileId({ companyProfileId: companyId })
    ).toBeNull()
  })
})
