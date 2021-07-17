import { getAddressByUserProfileId } from '../address/address'
import { createUser, getUserById } from '../user/user'
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile
} from './userProfile'

describe('services/userProfile', () => {
  const current = new Date()
  let userId = ''

  beforeEach(async () => {
    const user = await createUser({
      data: {
        issuer: 'fake.issuer.11231232',
        email: 'example@domain.com'
      }
    })

    userId = user.id
  })

  it('getUserProfile', async () => {
    const {
      id,
      userId: _userId,
      companyId,
      avatar,
      firstName,
      lastName,
      phone,
      mobile,
      updatedAt
    } = await getUserProfile({
      userId
    })
    const address = await getAddressByUserProfileId({ userProfileId: id })

    expect(id).not.toBeNull()
    expect(_userId).toEqual(userId)
    expect(companyId).toBeNull()
    expect(avatar).toBeNull()
    expect(firstName).toBeNull()
    expect(lastName).toBeNull()
    expect(phone).toBeNull()
    expect(mobile).toBeNull()
    expect(updatedAt).toBeInstanceOf(Date)
    expect(new Date(updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )

    expect(address.id).not.toBeNull()
    expect(address.premise).toBeNull()
    expect(address.companyProfileId).toBeNull()
    expect(address.country).toBeNull()
    expect(address.state).toBeNull()
    expect(address.postalCode).toBeNull()
    expect(address.street).toBeNull()
    expect(address.suburb).toBeNull()
    expect(address.updatedAt).toBeInstanceOf(Date)
    expect(new Date(address.updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
  })

  it('updateUserProfile', async () => {
    const now = new Date()
    const userProfileData = {
      avatar: 'https://myavatar.com',
      firstName: 'David',
      lastName: 'Jones',
      phone: '0412345678',
      mobile: '0221345678',
      address: {
        country: 'Australia',
        state: 'NSW',
        suburb: 'Crows Nest',
        postalCode: '2200',
        street: 'Albany Street',
        premise: 'Unit 1',
        formattedAddress: '2024 North Old Bastrop Highway, San Marcos, TX, USA'
      }
    }
    const {
      id,
      userId: _userId,
      companyId,
      avatar,
      firstName,
      lastName,
      phone,
      mobile,
      updatedAt,
      address
    } = await updateUserProfile({
      data: userProfileData,
      userId
    })
    const {
      country,
      state,
      suburb,
      postalCode,
      street,
      premise,
      formattedAddress
    } = address

    expect(_userId).toEqual(userId)
    expect(companyId).toBeNull()
    expect(avatar).toEqual(userProfileData.avatar)
    expect(firstName).toEqual(userProfileData.firstName)
    expect(lastName).toEqual(userProfileData.lastName)
    expect(phone).toEqual(userProfileData.phone)
    expect(mobile).toEqual(userProfileData.mobile)
    expect(updatedAt).toBeInstanceOf(Date)
    expect(new Date(updatedAt).getTime()).not.toEqual(now.getTime())

    expect(address.id).not.toBeNull()
    expect(address.userProfileId).toEqual(id)
    expect(address.updatedAt).toBeInstanceOf(Date)
    expect(new Date(address.updatedAt).getTime()).toBeGreaterThanOrEqual(
      now.getTime()
    )
    expect({
      country,
      state,
      suburb,
      postalCode,
      street,
      premise,
      formattedAddress
    }).toEqual(userProfileData.address)
  })

  it('deleteUserProfile', async () => {
    const userProfile = await getUserProfile({ userId })

    expect(await deleteUserProfile({ userId })).toBeTruthy()

    const user = await getUserById({ id: userId })

    expect(user.id).not.toBeNull()
    expect(await getUserProfile({ userId })).toBeNull()
    // Ensure address is deleted as well due to DB relation
    expect(
      await getAddressByUserProfileId({
        userProfileId: userProfile.id
      })
    ).toBeNull()
  })
})
