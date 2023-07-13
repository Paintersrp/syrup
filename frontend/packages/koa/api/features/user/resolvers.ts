import { buildMetadata } from '../../lib';

import { UpdateInput } from '../root/types';
import { User } from './models';
import { CreateUserDTO } from './types';

export const userResolvers = {
  Query: {
    users: async (_: any, { page, pageSize, filters }: any) => {
      let users = await User.findAll();

      if (filters) {
        users = User.filterObjects(users, filters);
      }

      if (page && pageSize) {
        users = User.paginateObjects(users, page, pageSize);
      }

      return users;
    },
    userById: async (_: any, { id }: { id: string }) => {
      const user = await User.findById(id);
      return user;
    },
    metaUser: async () => {
      const columns: any = await User.describe();
      return { metadata: buildMetadata(columns) };
    },
  },
  Mutation: {
    createUser: async (_: any, { firstName, lastName }: CreateUserDTO) => {
      const userInput = { firstName, lastName };
      User.validateInput(userInput);
      const createdUser = await User.create(userInput);

      return createdUser;
    },
    deleteUserById: async (_: any, { id }: { id: string }) => {
      const status = await User.deleteById(id);
      return status;
    },
    updateUserById: async (_: any, { id, input }: { id: string; input: UpdateInput }) => {
      const updatedUser = await User.updateById(id, input);
      return updatedUser;
    },
  },
};
