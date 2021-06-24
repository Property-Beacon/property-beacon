export const schema = gql`
  type UserProfile {
    phone: String
    avatar: String
    mobile: String
    address: Address
    lastName: String
    firstName: String
    created: DateTime
    updatedAt: DateTime
    # From resolver, not in DB schema
    fullName: String
  }

  input UpdateUserProfile {
    phone: String
    avatar: String
    mobile: String
    lastName: String
    firstName: String
    address: UpdateAddress
  }

  type Mutation {
    updateUserProfile(userId: String!, data: UpdateUserProfile!): UserProfile!
  }
`
