//*****************************************************************************************/

const StoreTemplate = (storeName, lowercaseName) =>
  `
import { create } from 'zustand';

const initial${storeName}State = {
  property: value,
};

export interface ${storeName}State {
  property: type,
}

export interface ${storeName}Store {
  ${lowercaseName}State: ${storeName}State,
  ${lowercaseName}Fn: (placeholder: any) => void;
}

export const use${storeName}Store = create<${storeName}Store>((set) => ({
    ${lowercaseName}State: initial${storeName}State,

    ${lowercaseName}Fn: (placeholder) => {
      set((state) => ({
        ${lowercaseName}State: {
            ...state.${lowercaseName}State,
            property: value,
        },
      }));
    },
}));
`;

//*****************************************************************************************/

export { StoreTemplate };
