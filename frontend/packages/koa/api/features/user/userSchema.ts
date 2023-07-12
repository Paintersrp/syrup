export const userSchema = `#graphql
  type User {
    id: ID!
    firstName: String
    lastName: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!): User
  }
`;
