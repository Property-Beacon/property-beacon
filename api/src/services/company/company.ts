import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import {
  createCompanyProfile,
  getCompanyProfile
} from 'src/services/companyProfile/companyProfile'

type ExcludedFields = 'userProfile'
type CreateCompanyParams = {
  data: Omit<Parameters<typeof db.company.create>[0]['data'], ExcludedFields>
}
type GetCompanyParams = {
  id: Parameters<typeof db.company.findUnique>[0]['where']['id']
}
type UpdateCompanyParams = Omit<
  Parameters<typeof db.company.update>[0]['data'],
  ExcludedFields
> &
  GetCompanyParams
type DeleteCompanyParams = Parameters<typeof db.company.delete>[0]['where']

// Required by RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function createCompany({ data }: CreateCompanyParams) {
  const company = await db.company.create({ data })

  // Create an empty companyProfile
  await createCompanyProfile({
    data: {
      companyId: company.id
    }
  })

  return company
}

async function getCompany(where: GetCompanyParams) {
  return db.company.findUnique({ where })
}

// TODO: filter
async function getCompanies() {
  return db.company.findMany()
}

async function updateCompany({
  id,
  name,
  displayName,
  shortName,
  website
}: UpdateCompanyParams) {
  return db.company.update({
    data: { name, displayName, shortName, website },
    where: { id }
  })
}

async function deleteCompany(where: DeleteCompanyParams) {
  return db.company.delete({ where })
}

// GraphQL resolver for composition fields (optional)
export const Company = {
  profile: (_, { root }) => getCompanyProfile({ companyId: root.id })
}

export { beforeResolver }
// GraphQL API & services
export { getCompany, getCompanies, deleteCompany }
// Services only
export { createCompany, updateCompany }
