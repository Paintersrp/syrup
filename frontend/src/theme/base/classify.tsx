import { properties, values } from '@/theme/common';

export const classify = (props: { [key: string]: any }) => {
  return Object.entries(props).reduce<{ [key: string]: any }>((styles, [key, value]) => {
    if (value !== undefined) {
      const property = properties[key] || key;
      const transformedValue = values[key] ? values[key](value) : value;
      styles[property] = transformedValue;
    }
    return styles;
  }, {});
};
