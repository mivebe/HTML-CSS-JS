export const reviewSchema = {
    text: value => {
        if (!value) {
            return 'Review text is required';
        }
        
        if (typeof value !== 'string' || value.trim().length < 1) {
            return 'Review text should be a valid string';
        }

        return null;
    },
    
};