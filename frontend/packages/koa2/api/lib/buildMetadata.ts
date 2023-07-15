/**
 * Metadata Data Transfer Object (DTO)
 *
 * Represents the metadata of a column in a data model.
 */
export type MetadataDTO = {
  type: String;
  name: String;
  allowNull: Boolean;
  defaultValue: String;
  primaryKey: Boolean;
  unique: Boolean;
  [key: string]: any;
};

/**
 * Build Metadata
 *
 * Builds an array of metadata objects from a given columns object.
 *
 * @param columns - The columns object containing the metadata information.
 * @returns An array of metadata objects.
 */
export const buildMetadata = (columns: MetadataDTO) => {
  return Object.keys(columns).map((columnName) => ({
    name: columnName,
    type: columns[columnName].type,
    allowNull: columns[columnName].allowNull,
    defaultValue: columns[columnName].defaultValue,
  }));
};
