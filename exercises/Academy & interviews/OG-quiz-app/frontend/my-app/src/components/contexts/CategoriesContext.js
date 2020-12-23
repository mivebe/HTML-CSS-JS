import { createContext } from 'react';

export const CategoriesContext = createContext({
  categoriesCont: [],
  setCategoriesState: () => {},
});
