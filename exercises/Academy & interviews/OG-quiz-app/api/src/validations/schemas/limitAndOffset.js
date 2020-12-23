import { queryErrors } from '../../errors/errors.js';
export const limitOffsetSchema = {
    limit: value => {
        if (Number.isNaN(+value) && value !== undefined || +value < 0) {
            return queryErrors.INVALID_LIMIT;
        }

        return null;
    },
    offset: value => {
        if (Number.isNaN(+value) && value!== undefined || +value <0) {
            return queryErrors.INVALID_OFFSET;
        }

        return null;
    },
 
};