export const banReasonSchema = {
    reason: value => {
        if (!value) {
            return 'Ban reason is required';
        }
        
        if (!(value === 'Bad behaviour' || value === 'Cheating' || value === 'Bad username' || value === 'Bad display name' || value === 'Damaged a book' || value === 'Tapanar')) { 
            return 'Ban reason should be: Bad behaviour, Cheating, Bad username, Bad display name, Damaged a book, Tapanar';
            
        }

        return null;
    },
};

