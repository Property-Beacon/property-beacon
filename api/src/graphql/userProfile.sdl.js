export const schema = gql`
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
    updateUserProfile(userId: String!, data: UpdateUserProfile!): UserProfile!
    deleteUserProfile(userId: String!): Boolean
  }
`
