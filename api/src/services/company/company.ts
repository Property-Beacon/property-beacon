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

// Required for RedwoodJS
function beforeResolver(rules) {
  rules.add(requireAuth)
}

async function createCompany({ data }: CreateCompanyParams) {
  const company = await db.company.create({ data })

  // Create an empty companyProfile
  await createCompanyProfile({
    data: {
      companyId: company.id,
      ...data
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

// GraphQL resolver for composition fields (optional)
export const Company = {
  profile: (_, { root }) => getCompanyProfile({ companyId: root.id })
}

export {
  beforeResolver,
  getCompany,
  createCompany,
  updateCompany,
  getCompanies
}
