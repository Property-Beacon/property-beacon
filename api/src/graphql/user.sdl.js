export const schema = gql`
  enum Role {
    USER
    ADMIN
    CLIENT
    CUSTOMER
  }

  type User {
    id: String!
    role: Role!
    email: String!
    logOn: DateTime!
    logOff: DateTime
    profile: UserProfile!
    createdAt: DateTime!
  }

  type Query {
    getUserById(id: String!): User! @requireAuth
    getUserByEmail(email: String!): User! @requireAuth
    getUsersByRole(role: Role!): [User!]! @requireAuth
  }

  type Mutation {
    deleteUserById(id: String!): Boolean! @requireAuth
    deleteUserByEmail(email: String!): Boolean! @requireAuth
    deleteUserByIssuer(issuer: String!): Boolean! @requireAuth
  }
`
