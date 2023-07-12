export const metaSchema = `#graphql
  type ModelMeta {
    metadata: [Metadata]
  }

  type MetaQuery {
    user: ModelMeta
    user2: ModelMeta
  }

  type Metadata {
    type: String
    name: String
    allowNull: Boolean
    defaultValue: String
    primaryKey: Boolean
    unique: Boolean
  }

  extend type Query {
    metaUser: ModelMeta
    metaUser2: ModelMeta
    metaQuery: MetaQuery
  }
`;
