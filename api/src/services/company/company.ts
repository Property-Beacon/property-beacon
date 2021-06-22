import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { getCompanyProfile } from 'src/services/companyProfile/companyProfile'

type ExcludedFields = 'userProfile'
type CreateCompanyParams = Omit<
  Parameters<typeof db.company.create>[0]['data'],
  ExcludedFields
>
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

async function createCompany(data: CreateCompanyParams) {
  return db.company.create({ data })
}

async function getCompany(where: GetCompanyParams) {
  return db.company.findUnique({ where })
}

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
