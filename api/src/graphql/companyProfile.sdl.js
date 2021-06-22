export const schema = gql`
  type CompanyProfile {
    id: String!
    companyId: String!
    phone: String
    fax: String
    mobile: String
    fullName: String
    email: String
    abn: String
    acn: String
    crn: String
    owner: String
    # For role CLIENT only
    mayor: String
    # Resolver from user.sdl.js
    address: Address
  }

  input UpdateCompanyProfile {
    phone: String
    fax: String
    mobile: String
    fullName: String
    email: String
    abn: String
    acn: String
    crn: String
    owner: String
    # For role CLIENT only
    mayor: String
    address: UpdateAddress
  }

  type Query {
    getCompanyProfile(companyId: String!): CompanyProfile
  }

  type Mutation {
    createCompanyProfile(
      companyId: String!
      data: UpdateCompanyProfile
    ): CompanyProfile!
    updateCompanyProfile(
      companyId: String!
      data: UpdateCompanyProfile
    ): CompanyProfile!
  }
`
