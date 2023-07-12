import { buildMetadata } from '../../lib';
import { User } from './userModels';

export type CreateUserDTO = { firstName: string; lastName: string };

export const userResolvers = {
  Query: {
    users: async () => {
      return User.findAll();
    },
    metaUser: async () => {
      const columns: any = await User.describe();
      return { metadata: buildMetadata(columns) };
    },
    metaUser2: async () => {
      const columns: any = await User.describe();
      return { metadata: buildMetadata(columns) };
    },
  },
  Mutation: {
    createUser: async (_: any, { firstName, lastName }: CreateUserDTO) => {
      return User.create({ firstName, lastName });
    },
  },
};
