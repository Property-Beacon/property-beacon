import { createAddress } from './address'

describe('services/address', () => {
  const current = new Date()
  const data = {
    name: 'My new address',
    country: 'Australia',
    state: 'NSW',
    suburb: 'Marrickville',
    postalCode: '2204',
    street: 'Marrickville Road'
  }

  it('createAddress', async () => {
    const { id, companyProfileId, userProfileId, updatedAt, ...rest } =
      await createAddress({ data })

    expect(id).not.toBeNull()
    expect(rest).toEqual(data)
    expect(userProfileId).toBeNull()
    expect(companyProfileId).toBeNull()
    expect(updatedAt).toBeInstanceOf(Date)
    expect(new Date(updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
  })
})
