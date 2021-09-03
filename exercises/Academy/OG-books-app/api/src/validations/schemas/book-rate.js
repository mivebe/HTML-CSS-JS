export const bookRatingSchema = {
    rating: value => {
        if (!value) {
            return 'Rating is required';
        }
        
        if (typeof value !== 'string' || isNaN(+value) || typeof +value !== 'number' || +value < 1 || +value > 5) {
            return 'Rating should be string containing only a number between [1, 5]';
        }

        return null;
    },
};