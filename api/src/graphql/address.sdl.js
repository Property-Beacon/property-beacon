export const schema = gql`
  type Address {
    name: String
    state: String
    street: String
    suburb: String
    country: String
    postalCode: String
    updatedAt: DateTime
  }

  input UpdateAddress {
    name: String
    state: String
    street: String
    suburb: String
    country: String
    postalCode: String
  }

  type Query {
    getAddressByUserProfileId(userProfileId: String!): Address!
    getAddressByCompanyProfileId(companyProfileId: String!): Address!
  }
`
