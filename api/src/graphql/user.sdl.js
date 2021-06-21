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
    issuer: String!
    logOn: DateTime!
    logOff: DateTime
    profile: UserProfile!
  }

  type Query {
    getUserById(id: String!): User!
    getUserByEmail(email: String!): User!
    getUserByIssuer(issuer: String!): User!
    getUsersByRole(role: Role!): [User!]!
  }

  type Mutation {
    deleteUserById(id: String!): Boolean
    deleteUserByEmail(email: String!): Boolean
    deleteUserByIssuer(issuer: String!): Boolean
  }
`
