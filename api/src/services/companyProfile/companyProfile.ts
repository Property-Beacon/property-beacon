import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  createAddress,
  getAddressByCompanyProfileId,
  updateAddressByCompanyProfileId,
  UpdateAddressParams
} from 'src/services/address/address'

type ExcludedFields = 'id' | 'Company'
type CreateCompanyProfileParams = Omit<
  Parameters<typeof db.companyProfile.create>[0]['data'],
  ExcludedFields
>
export type RequiredCompanyId = {
  companyId: CreateCompanyProfileParams['companyId']
}
export type UpdateCompanyProfile = {
  data: Omit<
    Parameters<typeof db.companyProfile.update>[0]['data'],
    ExcludedFields
  > & { address: UpdateAddressParams }
} & RequiredCompanyId
type GetCompanyProfileParams = Pick<
  Parameters<typeof db.companyProfile.findUnique>[0]['where'],
  'companyId'
>

// Required for RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function createCompanyProfile(
  data: CreateCompanyProfileParams & RequiredCompanyId
) {
  return db.companyProfile.create({ data })
}

async function getCompanyProfile(where: GetCompanyProfileParams) {
  return db.companyProfile.findUnique({ where })
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
            companyProfileId: profile.id,
            ...(addressPayload as Parameters<
              typeof db.companyProfile.create
            >[0]['data'])
          })
        : await updateAddressByCompanyProfileId({
            ...where,
            ...addressPayload
          })
    }
  }

  return { ...profile, address }
}

// GraphQL resolver for composition fields (optional)
export const CompanyProfile = {
  address: (_, { root }) =>
    getAddressByCompanyProfileId({ companyProfileId: root.id })
}

export {
  beforeResolver,
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile
}
