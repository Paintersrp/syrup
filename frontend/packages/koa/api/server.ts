/**
 * Koa Apollo Server
 *
 * This file sets up a Koa server with Apollo Server to handle GraphQL requests.
 * It merges the type definitions and resolvers from different feature modules
 * and initializes the server object with the merged schema and resolvers.
 *
 * Features:
 *  - User: Handles user-related type definitions and resolvers.
 *  - Meta: Handles meta-related type definitions and resolvers.
 *  - Root: Handles root-level type definitions and resolvers.
 *
 * Middlewares:
 *  - jwtMiddleware: Middleware for JWT authentication.
 *  - errorMiddleware: Middleware for error handling.
 *
 * The server is started by calling the startServer function, which initializes
 * the Apollo Server, applies the Koa middleware, syncs the Sequelize database,
 * and starts the Koa server to listen for incoming requests.
 */

import Koa from 'koa';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { ApolloServer } from 'apollo-server-koa';

import { userResolvers, userSchema } from './features/user';
import { metaResolvers, metaSchema } from './features/meta';
import { rootResolvers, rootSchema } from './features/root';

import { sequelize } from './lib';
import { errorMiddleware, jwtMiddleware, loggingMiddleware } from './middleware';

/***
 * Initate Koa Server with Middlewares
 */
const app = new Koa();
app.use(jwtMiddleware);
app.use(loggingMiddleware);
app.use(errorMiddleware);
// app.use(rateLimitingMiddleware);

/***
 * Merge app schemas and resolvers
 */
const typeDefs = [userSchema, metaSchema, rootSchema];
const resolvers = [userResolvers, metaResolvers, rootResolvers];
const mergedTypeDefs = mergeTypeDefs(typeDefs);
const mergedResolvers = mergeResolvers(resolvers);

/***
 * Initiate Server Object with Config
 */
const server = new ApolloServer({ typeDefs: mergedTypeDefs, resolvers: mergedResolvers });

/***
 * Function to start Apollo Server through the Koa Server
 */
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
  await sequelize.sync();

  app.listen({ port: 4000 }, () => {
    console.log(`Server running on http://localhost:4000${server.graphqlPath}`);
  });
}

/***
 * Call to start the server and catch/handle errors
 */
startServer().catch((err) => {
  console.error('Error starting server:', err);
});
