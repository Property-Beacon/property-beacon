export const schema = gql`
  type Company {
    id: String!
    name: String
    displayName: String
    shortName: String
    website: String
    profile: CompanyProfile
    updatedAt: DateTime
    createdAt: DateTime!
  }

  input UpdateCompany {
    name: String
    displayName: String
    shortName: String
    website: String
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
