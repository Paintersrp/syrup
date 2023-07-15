import { userResolvers } from '../user/resolvers';

export const metaResolvers = {
  Query: {
    metaQuery: async () => {
      const [userMeta] = await Promise.all([userResolvers.Query.metaUser()]);
      // const [userMeta, userMeta2] = await Promise.all([
      //   userResolvers.Query.metaUser(),
      //   userResolvers.Query.metaUser2(),
      // ]);
      return { user: userMeta };
    },
  },
};
