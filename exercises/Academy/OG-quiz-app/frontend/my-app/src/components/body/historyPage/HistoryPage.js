import React, { useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch';
import HistoryEntry from './HistoryEntry';
import PaginationBar from './PaginationBar';
import './HistoryPage.css'
const HistoryPage = () => {

    const LIMIT = 10;

    const [historyArray, setHistoryArray] = useState([]);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [searchTextValue, setSearchTextValue] = useState('');
    const [search, setSearch] = useState('');
    const fetchFunc = useAuthorizedRequest();

    useEffect(() => {
        const offset = (page - 1) * LIMIT;
        const history = async (offset, limit) => {
            try {
                const { history, count } = await fetchFunc('/users/history', 'GET', { query: { offset: offset, limit: limit, search: search } });
                setHistoryArray(history);
                setPagesCount(Math.ceil(count / limit) || 1);
            }
            catch (error) {
                console.log(error.message);
            }
        };
        history(offset, LIMIT);
    }, [page, search])

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setPage(1);
        setSearch(searchTextValue);
    }

    return (<div className='history_page_container'>
        <form className='history_input_form' onSubmit={handleSubmit}>
            <input type='text' placeholder="Search by quiz name" value={searchTextValue} onChange={(ev) => { setSearchTextValue(ev.target.value) }} />
            <button >Search</button>
        </form>
        <div className='history_explanations_conteiner'>
            <span>Quiz Name</span>
            <span>Category</span>
            <span>Score</span>
            <span>Date of solving </span>
        </div>
        <div className='history_entries_container'>
            {historyArray.length > 0
                ? historyArray.map((el) => (<HistoryEntry key={el.quiz_id} historyEntry={el} />))
                : <h1 className='history_entries_no_solved_quizzes' >You have not solved any quizzes yet.</h1>}
        </div>
        <div className='history_pagination_bar'>
            <PaginationBar setPage={setPage} pagesCount={pagesCount} page={page} />
        </div>
    </div>)
}

export default HistoryPage;


