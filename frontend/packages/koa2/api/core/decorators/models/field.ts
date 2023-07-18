type FieldInterface = {
  type: any;
  defaultValue?: any;
  allowNull?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  readOnly?: boolean;
  verbose?: string;
};

export function Field({
  type,
  defaultValue = undefined,
  allowNull = true,
  primaryKey = false,
  autoIncrement = false,
  readOnly = false,
  verbose = undefined,
}: FieldInterface): PropertyDecorator {
  return (target: any, propertyKey: string | symbol): void => {
    if (!target.constructor.fields) {
      target.constructor.fields = {};
    }

    target.constructor.fields[propertyKey] = {
      type,
      defaultValue,
      allowNull,
      primaryKey,
      autoIncrement,
      readOnly,
    };

    if (verbose) {
      if (!target.constructor.metadata) {
        target.constructor.metadata = {};
      }

      target.constructor.metadata[propertyKey] = { verbose: verbose };
    }
  };
}
