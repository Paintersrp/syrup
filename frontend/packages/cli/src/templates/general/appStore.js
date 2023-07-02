/**
 * @description
 * Returns the template for generating a store.
 *
 * @param {string} storeName - The name of the store.
 * @param {string} lowercaseName - The lowercase name of the store.
 * @returns {string} - The store template.
 */
export const AppStoreTemplate = (storeName, lowercaseName) =>
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
