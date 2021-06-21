import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

type GetUserProfileParams = Pick<
  Parameters<typeof db.userProfile.findUnique>[0]['where'],
  'userId'
>
type CreateUserProfileParams = Parameters<typeof db.userProfile.create>[0]
type UpdateUserProfileData = Pick<
  Parameters<typeof db.userProfile.update>[0]['data'],
  'firstName' | 'lastName' | 'avatar' | 'phone' | 'mobile' | 'modified'
> & {
  address: Pick<
    Parameters<typeof db.address.update>[0]['data'],
    'country' | 'state' | 'postalCode' | 'street' | 'name' | 'suburb'
  >
}
type UpdateUserProfileParams = {
  data: UpdateUserProfileData
}

type DeleteUserProfile = Pick<
  Parameters<typeof db.userProfile.delete>[0]['where'],
  'userId'
>

// Required for RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function getUserProfile({ userId }: GetUserProfileParams) {
  return db.userProfile.findUnique({ where: { userId } })
}

async function createUserProfile({ data }: CreateUserProfileParams) {
  return db.userProfile.create({
    data
  })
}

async function updateUserProfileById({
  userId,
  data
}: UpdateUserProfileParams & {
  userId: string
}) {
  const { address: addressPayload, ...userProfilePayload } = data
  const profile = await db.userProfile.update({
    data: { ...userProfilePayload, modified: new Date() },
    where: { userId }
  })
  const where = {
    userProfileId: profile.id
  }
  const address = await db.address.findUnique({ where })

  if (addressPayload) {
    return {
      ...profile,
      address: !address
        ? await db.address.create({
            data: {
              userProfileId: profile.id,
              ...(addressPayload as Parameters<
                typeof db.userProfile.create
              >[0]['data'])
            }
          })
        : await db.address.update({
            data: addressPayload,
            where
          })
    }
  }

  return { ...profile, address }
}

async function deleteUserProfileById({ userId }: DeleteUserProfile) {
  return db.userProfile.delete({ where: { userId } })
}

// GraphQL resolver for composition fields
export const UserProfile = {
  address: (_, { root }) =>
    db.address.findUnique({ where: { userProfileId: root.id } })
}

export {
  beforeResolver,
  getUserProfile,
  createUserProfile,
  updateUserProfileById,
  deleteUserProfileById
}
