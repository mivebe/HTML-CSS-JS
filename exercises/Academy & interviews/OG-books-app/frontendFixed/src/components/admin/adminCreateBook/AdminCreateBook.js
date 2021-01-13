import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './AdminCreateBook.css'
import GenresTable from './GenresTable';

const AdminCreateBook = () => {
    const { register, errors } = useForm({ mode: 'onChange' });
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('Genres');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const urlChecker = (value) => value.substring(value.length - 4) === '.png';
    const createBook = () => {
        fetch(`http://localhost:5000/admin/books`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: title,
                    author,
                    description,
                    imageURL,
                    genre
                })
            }
        )
            .then(res => res.json())

            .then(res => {
                if (!Array.isArray(res)) {
                    history.push(`/admin/books/${res.bookId}`)
                }
                else { throw new Error(res) }
            })
            .catch((err) => alert(err));
    }
    return (
        <div className="create-book-full">
            <div className="create-book">
                {/* <div>
                    <a>Title: </a>
                    <a>Image: </a>
                    <a>Description: </a>
                    <a>Author: </a>
                    <a>Genre: </a>
                </div> */}
                <form className='input-boxes'>
                    <input type='textbox' value={title} placeholder='Title...' ref={register({ required: true, minLength: 2, maxLength: 30 })} name="title" onChange={(ev) => setTitle(ev.target.value)} />
                    {errors.title && <span className="create-book-form-error">Title must be between 2 - 30 symbols</span>}
                    <input type='textbox' value={imageURL} placeholder='Image...' ref={register({ required: true, validate: urlChecker })} name="imageURL" onChange={(ev) => setImageURL(ev.target.value)} />
                    {errors.imageURL && <span className="create-book-form-error">Image url should end in .png</span>}
                    <input type='textbox' value={description} placeholder='Description...' ref={register({ required: true, minLength: 5 })} name="description" onChange={(ev) => setDescription(ev.target.value)} />
                    {errors.imageURL && <span className="create-book-form-error">Descrition is required</span>}
                    <input type='textbox' value={author} placeholder='Author...' ref={register({ required: true })} name="author" onChange={(ev) => setAuthor(ev.target.value)} />
                    {errors.author && <span className="create-book-form-error">Author is required</span>}
                    <GenresTable genre={genre} setGenre={setGenre} />
                </form>
            </div>
            <button className="create-book-button" onClick={createBook}>Create book</button>
        </div>)
}

export default AdminCreateBook;