export const schema = gql`
  type Company {
    id: String!
    name: String
    displayName: String
    shortName: String
    website: String
    profile: CompanyProfile
  }

  input UpdateCompany {
    name: String
    displayName: String
    shortName: String
    website: String
    profile: UpdateCompanyProfile
  }

  type Query {
    getCompany(id: String!): Company!
    getCompanies: [Company!]!
  }

  type Mutation {
    createCompany(data: UpdateCompany): Company!
    updateCompany(id: String!, data: UpdateCompany): Company!
  }
`
