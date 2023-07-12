import { userResolvers } from '../user/userResolvers';

export const metaResolvers = {
  Query: {
    metaQuery: async () => {
      const [userMeta, userMeta2] = await Promise.all([
        userResolvers.Query.metaUser(),
        userResolvers.Query.metaUser2(),
      ]);
      return { user: userMeta, user2: userMeta2 };
    },
  },
};
