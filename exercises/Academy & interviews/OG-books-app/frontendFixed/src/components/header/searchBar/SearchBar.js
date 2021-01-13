import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { useForm } from 'react-hook-form'
import '../Header.css'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const { register, handleSubmit } = useForm();
    let value = ''
    const history = useHistory()

    const onSubmit = (data) => {
        value = data.searchBar
        history.push(`/search?search=${value}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='header_search'>
            <div className='header_search'>
                <input
                    ref={register}
                    className='header_searchInput'
                    type='text'
                    name='searchBar'
                />
                <SearchIcon onClick={handleSubmit(onSubmit)} className='header_searchIcon' />
            </div>
        </form>
    )
}

export default SearchBar