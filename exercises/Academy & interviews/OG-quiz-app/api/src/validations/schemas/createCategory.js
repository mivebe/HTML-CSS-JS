import { categoriesErrors } from '../../errors/errors.js';

export const createCategorySchema = {
    categoryName: value => {
        if (!Number.isNaN(+value) || typeof value !== 'string') {
            return  categoriesErrors.CATEGORY_NAME_MUST_BE_STRING;
            
        }
        if (value.length < 2) {
            return categoriesErrors.CATEGORY_LENGTH_ATLEAST_TWO;
        }
        return null;
    },
    
};