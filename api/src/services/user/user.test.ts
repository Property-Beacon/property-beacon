import type { Role } from 'types/graphql'
import { getUserProfile } from '../userProfile/userProfile'
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByIssuer,
  getUsersByRole,
  updateUserByEmail,
  updateUserById,
  updateUserByIssuer
} from './user'

describe('services/user', () => {
  const current = new Date()

  it('create a new user', async () => {
    const data = {
      issuer: 'fake.issuer.11231232',
      email: 'example@domain.com'
    }
    const user = await createUser({
      data
    })
    const userProfile = await getUserProfile({ userId: user.id })

    expect(user.id).not.toBeNull()
    expect(user.logOff).toBeNull()
    expect(user.role).toEqual('USER')
    expect(user.email).toEqual(data.email)
    expect(user.logOn).toBeInstanceOf(Date)
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(new Date(user.logOn).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
    expect(new Date(user.createdAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )

    expect(userProfile.id).not.toBeNull()
    expect(userProfile.updatedAt).toBeInstanceOf(Date)
    expect(new Date(userProfile.updatedAt).getTime()).toBeGreaterThanOrEqual(
      current.getTime()
    )
  })

  it('create a CUSTOMER role user', async () => {
    const data = {
      issuer: 'fake.customer.issuer.11231232',
      email: 'customer@domain.com',
      role: 'CUSTOMER' as Role
    }

    const user = await createUser({
      data
    })

    expect(user.id).not.toBeNull()
    expect(user.logOff).toBeNull()
    expect(user.role).toEqual(data.role)
    expect(user.email).toEqual(data.email)
    expect(user.logOn).toBeInstanceOf(Date)
    expect(user.createdAt).toBeInstanceOf(Date)
  })

  it('getUserById | getUserByEmail | getUserByIssuer | getUsersByRole', async () => {
    const createdUser = await createUser({
      data: {
        issuer: 'fake.issuer.9999999',
        email: 'user@domain.com'
      }
    })

    expect(await getUserById({ id: createdUser.id })).toEqual(createdUser)
    expect(await getUserByEmail({ email: createdUser.email })).toEqual(
      createdUser
    )
    expect(await getUserByIssuer({ issuer: createdUser.issuer })).toEqual(
      createdUser
    )

    expect(await getUsersByRole({ role: 'USER' })).toEqual([createdUser])
  })

  it('updateUserById | updateUserByEmail | updateUserByIssuer | updateUsersByRole', async () => {
    const createdUser = await createUser({
      data: {
        issuer: 'fake.issuer.77777',
        email: 'update.user@domain.com'
      }
    })
    let logOn = new Date('2020-01-01')
    let user = await updateUserById({ id: createdUser.id, data: { logOn } })
    expect(user.logOn).toEqual(logOn)

    logOn = new Date('2020-02-02')
    user = await updateUserByEmail({
      email: createdUser.email,
      data: { logOn }
    })
    expect(user.logOn).toEqual(logOn)

    logOn = new Date('2020-03-03')
    user = await updateUserByIssuer({
      issuer: createdUser.issuer,
      data: { logOn }
    })
    expect(user.logOn).toEqual(logOn)
  })
})
