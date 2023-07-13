export const metaSchema = `#graphql
  type ModelMeta {
    metadata: [Metadata]
  }

  type MetaQuery {
    user: ModelMeta
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
    metaQuery: MetaQuery
  }
`;
