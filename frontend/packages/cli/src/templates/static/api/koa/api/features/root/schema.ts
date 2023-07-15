export const rootSchema = `#graphql
  type Query {
    hello: String
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User
  }
`;
