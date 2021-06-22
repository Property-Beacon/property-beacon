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
  'firstName' | 'lastName' | 'avatar' | 'phone' | 'mobile' | 'modified'
> & { address: UpdateAddressParams }
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
  const address = await getAddressByUserProfileId(where)

  if (addressPayload) {
    return {
      ...profile,
      address: !address
        ? await createAddress({
            userProfileId: profile.id,
            ...(addressPayload as Parameters<
              typeof db.userProfile.create
            >[0]['data'])
          })
        : await updateAddressByUserProfileId({
            ...where,
            ...addressPayload
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
  fullName: (_, { root }) =>
    [root.firstName, root.lastName].filter((v) => v).join(' '),
  address: (_, { root }) =>
    getAddressByUserProfileId({ userProfileId: root.id })
}

export {
  beforeResolver,
  getUserProfile,
  createUserProfile,
  updateUserProfileById,
  deleteUserProfileById
}
