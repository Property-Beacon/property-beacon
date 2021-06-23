import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

type AddressFields =
  | 'name'
  | 'state'
  | 'street'
  | 'suburb'
  | 'country'
  | 'postalCode'
  | 'updatedAt'
type UniqueKeys = Parameters<typeof db.address.update>[0]['where']
type UserProfileId = UniqueKeys['userProfileId']
type CompanyProfileId = UniqueKeys['companyProfileId']
type CreateAddressParams = {
  data: Pick<
    Parameters<typeof db.address.create>[0]['data'],
    AddressFields | 'userProfileId' | 'companyProfileId'
  >
}
type GetAddressParams = Parameters<typeof db.address.findUnique>[0]['where']
export type UpdateAddressParams = Pick<
  Parameters<typeof db.address.update>[0]['data'],
  AddressFields
>

// Required for RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function createAddress({ data }: CreateAddressParams) {
  return db.address.create({ data })
}

async function getAddressByUserProfileId({ userProfileId }: GetAddressParams) {
  return db.address.findUnique({ where: { userProfileId } })
}

async function getAddressByCompanyProfileId({
  companyProfileId
}: GetAddressParams) {
  return db.address.findUnique({ where: { companyProfileId } })
}

async function updateAddressByUserProfileId({
  userProfileId,
  ...data
}: UpdateAddressParams & { userProfileId: UserProfileId }) {
  return db.address.update({ data, where: { userProfileId } })
}

async function updateAddressByCompanyProfileId({
  companyProfileId,
  ...data
}: UpdateAddressParams & { companyProfileId: CompanyProfileId }) {
  return db.address.update({ data, where: { companyProfileId } })
}

export {
  beforeResolver,
  createAddress,
  getAddressByUserProfileId,
  getAddressByCompanyProfileId,
  updateAddressByUserProfileId,
  updateAddressByCompanyProfileId
}
