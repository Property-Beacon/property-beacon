import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  createAddress,
  getAddressByCompanyProfileId,
  updateAddressByCompanyProfileId,
  UpdateAddressParams
} from 'src/services/address/address'

type ExcludedFields = 'id' | 'Company' | 'updatedAt' | 'address'
type CreateCompanyProfileData = Omit<
  Parameters<typeof db.companyProfile.create>[0]['data'],
  ExcludedFields
>
type CreateCompanyProfileParams = {
  data: Omit<CreateCompanyProfileData, 'companyId'> & {
    companyId: CreateCompanyProfileData['companyId']
  }
}
export type UpdateCompanyProfile = {
  data: Omit<
    Parameters<typeof db.companyProfile.update>[0]['data'],
    ExcludedFields | 'companyId'
  > & { address?: UpdateAddressParams }
} & { companyId: CreateCompanyProfileData['companyId'] }
type GetCompanyProfileParams = Pick<
  Parameters<typeof db.companyProfile.findUnique>[0]['where'],
  'companyId'
>
type DeleteCompanyProfile = Pick<
  Parameters<typeof db.companyProfile.delete>[0]['where'],
  'companyId'
>

// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function getCompanyProfile(where: GetCompanyProfileParams) {
  return db.companyProfile.findUnique({ where })
}

async function createCompanyProfile({ data }: CreateCompanyProfileParams) {
  return db.companyProfile.create({ data })
}

async function updateCompanyProfile({
  companyId,
  data: { address: addressPayload, ...data }
}: UpdateCompanyProfile) {
  const profile = await db.companyProfile.update({
    data,
    where: { companyId }
  })
  const where = {
    companyProfileId: profile.id
  }

  const address = await getAddressByCompanyProfileId(where)

  if (addressPayload) {
    return {
      ...profile,
      address: !address
        ? await createAddress({
            data: {
              companyProfileId: profile.id,
              ...(addressPayload as Parameters<
                typeof db.companyProfile.create
              >[0]['data'])
            }
          })
        : await updateAddressByCompanyProfileId({
            ...where,
            ...addressPayload
          })
    }
  }

  return { ...profile, address }
}

async function deleteCompanyProfile({ companyId }: DeleteCompanyProfile) {
  await db.companyProfile.delete({ where: { companyId } })

  return true
}

// GraphQL resolver for composition fields (optional)
export const CompanyProfile = {
  address: (_, { root }) =>
    getAddressByCompanyProfileId({ companyProfileId: root.id })
}

export { beforeResolver }
// GraphQL API & services
export { updateCompanyProfile }
// Services only
export { getCompanyProfile, createCompanyProfile, deleteCompanyProfile }
