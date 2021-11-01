export const schema = gql`
  type Company {
    id: String!
    name: String
    logo: String
    displayName: String
    shortName: String
    website: String
    profile: CompanyProfile
    updatedAt: DateTime
    createdAt: DateTime!
  }

  input UpdateCompany {
    name: String
    logo: String
    displayName: String
    shortName: String
    website: String
  }

  type Query {
    getCompany(id: String!): Company! @requireAuth
    getCompanies: [Company!]! @requireAuth
  }

  type Mutation {
    deleteCompany(id: String!): Boolean @requireAuth
    createCompany(data: UpdateCompany!): Company! @requireAuth
    updateCompany(id: String!, data: UpdateCompany!): Company! @requireAuth
  }
`
