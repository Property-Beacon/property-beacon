import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  createAddress,
  getAddressByUserProfileId,
  updateAddressByUserProfileId,
  UpdateAddressParams
} from 'src/services/address/address'

type GetUserProfileParams = Pick<
  Parameters<typeof db.userProfile.findUnique>[0]['where'],
  'userId'
>
type CreateUserProfileParams = Parameters<typeof db.userProfile.create>[0]
type UpdateUserProfileData = Pick<
  Parameters<typeof db.userProfile.update>[0]['data'],
  'firstName' | 'lastName' | 'avatar' | 'phone' | 'mobile' | 'userId'
> & { address?: UpdateAddressParams }
type UpdateUserProfileParams = {
  data: UpdateUserProfileData
}
type DeleteUserProfile = Pick<
  Parameters<typeof db.userProfile.delete>[0]['where'],
  'userId'
>

// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function getUserProfile({ userId }: GetUserProfileParams) {
  return db.userProfile.findUnique({ where: { userId } })
}

async function createUserProfile({ data }: CreateUserProfileParams) {
  const userProfile = await db.userProfile.create({
    data
  })

  await createAddress({
    data: { userProfileId: userProfile.id }
  })

  return userProfile
}

async function updateUserProfile({
  userId,
  data
}: UpdateUserProfileParams & {
  userId: string
}) {
  const { address: addressPayload, ...userProfilePayload } = data
  const profile = await db.userProfile.update({
    data: userProfilePayload,
    where: { userId }
  })
  const where = {
    userProfileId: profile.id
  }
  const address = await getAddressByUserProfileId(where)

  if (addressPayload) {
    return {
      ...profile,
      address: !address
        ? await createAddress({
            data: {
              userProfileId: profile.id,
              ...(addressPayload as Parameters<
                typeof db.userProfile.create
              >[0]['data'])
            }
          })
        : await updateAddressByUserProfileId({
            ...where,
            ...addressPayload
          })
    }
  }

  return { ...profile, address }
}

async function deleteUserProfile({ userId }: DeleteUserProfile) {
  await db.userProfile.delete({ where: { userId } })
  return true
}

// GraphQL resolver for composition fields
export const UserProfile = {
  fullName: (_, { root }) =>
    [root.firstName, root.lastName].filter((v) => v).join(' '),
  address: (_, { root }) =>
    getAddressByUserProfileId({ userProfileId: root.id })
}

export { beforeResolver }
// GraphQL API & services
export { updateUserProfile, deleteUserProfile }
// Services only
export { getUserProfile, createUserProfile }
