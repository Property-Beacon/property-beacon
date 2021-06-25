import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  createUserProfile,
  deleteUserProfile,
  getUserProfile
} from 'src/services/userProfile/userProfile'

type CreateUserParams = Parameters<typeof db.user.create>[0]
type GetUserParams = Parameters<typeof db.user.findUnique>[0]['where']
type GetUsersParams = Parameters<typeof db.user.findMany>[0]['where']
type DeleteUserParams = Parameters<typeof db.user.delete>[0]['where']
type UpdateUserData = {
  logOn: Parameters<typeof db.user.update>[0]['data']['logOn']
}
type UpdateUserParams = {
  data: UpdateUserData
}

// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

/**
 * Object parameters mainly to fulfill GraphQL resolver interface
 * since all parameters will be aggregated into an args object
 * i.e. getUser(id: String) -> resolverFn({id: 'xxx'}, context)
 */
async function createUser({ data }: CreateUserParams) {
  // TODO: base on email domain to assign role
  const user = await db.user.create({
    data
  })

  // Create a new userProfile
  await createUserProfile({
    data: {
      userId: user.id
    }
  })

  return user
}

async function getUserById({ id }: GetUserParams) {
  return db.user.findUnique({ where: { id } })
}

async function getUserByEmail({ email }: GetUserParams) {
  return db.user.findUnique({ where: { email } })
}

async function getUserByIssuer({ issuer }: GetUserParams) {
  return db.user.findUnique({ where: { issuer } })
}

async function getUsersByRole({ role }: GetUsersParams) {
  return db.user.findMany({ where: { role } })
}

async function updateUserById({ id, data }: UpdateUserParams & { id: string }) {
  return db.user.update({ data, where: { id } })
}
async function updateUserByEmail({
  email,
  data
}: UpdateUserParams & { email: string }) {
  return db.user.update({ data, where: { email } })
}
async function updateUserByIssuer({
  issuer,
  data
}: UpdateUserParams & { issuer: string }) {
  const user = await db.user.update({
    data,
    where: { issuer }
  })

  return user
}

async function deleteUser({ where }: { where: DeleteUserParams }) {
  const user = await db.user.findUnique({ where })

  if (!user) {
    return false
  }

  await db.user.delete({ where })
  await deleteUserProfile({ userId: user.id })

  return true
}

async function deleteUserById({ id }: DeleteUserParams) {
  return deleteUser({ where: { id } })
}

async function deleteUserByEmail({ email }: DeleteUserParams) {
  return deleteUser({ where: { email } })
}

async function deleteUserByIssuer({ issuer }: DeleteUserParams) {
  return deleteUser({ where: { issuer } })
}

// GraphQL resolver for composition fields
export const User = {
  profile: (_, { root }) =>
    getUserProfile({
      userId: root.id
    })
}

export { beforeResolver }
// GraphQL API & services
export {
  getUserById,
  getUserByEmail,
  getUsersByRole,
  deleteUserById,
  deleteUserByEmail,
  deleteUserByIssuer
}
// Services only
export {
  createUser,
  getUserByIssuer,
  updateUserById,
  updateUserByEmail,
  updateUserByIssuer
}
