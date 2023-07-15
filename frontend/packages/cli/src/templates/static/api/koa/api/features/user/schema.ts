export const userSchema = `#graphql
  input UserUpdateDTO {
    firstName: String
    lastName: String
  }

  extend type Query {   
    users(page: Int, pageSize: Int, filters: JSON): [User!]!
    userById(id: ID!): User
    metaUser: ModelMeta
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!): User!
    deleteUserById(id: ID!): Boolean
    updateUserById(id: ID!, input: UserUpdateDTO): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
  }

  scalar JSON
`;
