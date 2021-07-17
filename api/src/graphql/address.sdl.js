export const schema = gql`
  type Address {
    premise: String
    state: String
    street: String
    suburb: String
    country: String
    formattedAddress: String
    postalCode: String
    updatedAt: DateTime
  }

  input UpdateAddress {
    premise: String
    state: String
    street: String
    suburb: String
    country: String
    formattedAddress: String
    postalCode: String
  }

  type Query {
    getAddressByUserProfileId(userProfileId: String!): Address!
    getAddressByCompanyProfileId(companyProfileId: String!): Address!
  }
`
