export const schema = gql`
  type Address {
    lat: String
    lng: String
    state: String
    street: String
    suburb: String
    premise: String
    country: String
    gPlaceId: String
    postalCode: String
    updatedAt: DateTime
    formattedAddress: String
  }

  input UpdateAddress {
    lat: String
    lng: String
    state: String
    street: String
    suburb: String
    premise: String
    country: String
    gPlaceId: String
    postalCode: String
    formattedAddress: String
  }

  type Query {
    getAddressByUserProfileId(userProfileId: String!): Address! @requireAuth
    getAddressByCompanyProfileId(companyProfileId: String!): Address!
      @requireAuth
  }
`
