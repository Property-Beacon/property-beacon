export const schema = gql`
  type Address {
    name: String
    state: String
    street: String
    suburb: String
    country: String
    postalCode: String
  }

  input UpdateAddress {
    name: String
    state: String
    street: String
    suburb: String
    country: String
    postalCode: String
  }

  type UserProfile {
    phone: String
    avatar: String
    mobile: String
    address: Address
    lastName: String
    firstName: String
    created: DateTime
    modified: DateTime
    # From resolver, not in DB schema
    fullName: String
  }

  input UpdateUserProfile {
    phone: String
    avatar: String
    mobile: String
    lastName: String
    firstName: String
    modified: DateTime
    address: UpdateAddress
  }

  type Mutation {
    updateUserProfileById(
      userId: String!
      data: UpdateUserProfile
    ): UserProfile!
    deleteUserProfileById(userId: String!): Boolean
  }
`
