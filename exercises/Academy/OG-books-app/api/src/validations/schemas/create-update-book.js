export const bookNameSchema = {
    name: value => {
        if (!value) {
            return 'Book name is required';
        }
        
        if (typeof value !== 'string' ) {
            return 'Book name should be a string';
        }

        return null;
    },
    
};
const genres = ['Action and Adventure',
    'Classics',
    'Comics',
    'Detective and Mystery',
    'Fantasy',
    'Horror',
    'Romance',
    'Science Fiction',
    'Thrillers',
    'Biographies',
    'Cookbooks',
    'History',
    'Poetry',
    'Self-Help',
    'Comedy',
    'Mythology'];
export const createBookSchema={
    name: value => {
        if (!value) {
            return 'Book name is required';
        }
        
        if (typeof value !== 'string' ) {
            return 'Book name should be a string';
        }

        return null;
    },
    description: value => {
        if (!value) {
            return 'Book description is required';
        }
        
        if (typeof value !== 'string' ) {
            return 'Book description should be a string';
        }

        return null;
    },
    author: value => {
        if (!value) {
            return 'Book author is required';
        }
        
        if (typeof value !== 'string' ) {
            return 'Author name should be a string';
        }

        return null;
    },
    imageURL: value => {
        if (!value) {
            return 'ImageURL is required';
        }
        
        if (typeof value !== 'string' || value.substring(value.length-4)!=='.png') {
            return 'ImageURL should be a string ending in .png ';
        }

        return null;
    },
    genre: value => {
        if (!value) {
            return 'Genre is required';
        }
        
        if (typeof value !== 'string' ) {
            return 'Genre should be a string';
        }
        if (!genres.includes(value)) { 
            return 'Invalid genre';
            
        }
 


        return null;
    },
    
};

