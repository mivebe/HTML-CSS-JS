import React, { useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch';
import PaginationBar from '../historyPage/PaginationBar';
import LeaderboardEntry from './LeaderboardEntry';
import './LeaderBoardPage.css'

const LeaderboardPage = () => {

    const LIMIT = 10;

    const [leaderboard, setLeaderboard] = useState([]);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [searchTextValue, setSearchTextValue] = useState('');
    const [search, setSearch] = useState('');
    const fetchFunc = useAuthorizedRequest();

    useEffect(() => {
        const offset = (page - 1) * LIMIT;
        const leaderboard = async (search, offset, limit) => {
            try {
                const { leaderboard, count } = await fetchFunc('/users/leaderboard', 'GET', { query: { offset: offset, limit: limit, search: search } });
                setLeaderboard(leaderboard);
                setPagesCount(Math.ceil(count / limit) || 1);
            }
            catch (error) {
                console.log(error.message);
            }
        };
        leaderboard(search, offset, LIMIT);
    }, [page, search])

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setPage(1);
        setSearch(searchTextValue);
    }

    return (<div className='leaderboard_page_container'>
        <form className='leaderboard_input_form' onSubmit={handleSubmit}>
            <input type='text' placeholder="Search by students name or username" value={searchTextValue} onChange={(ev) => { setSearchTextValue(ev.target.value) }} />
            <button >Search</button>
        </form>
        <div className='leaderboard_explanations_conteiner'>
            <span>Student</span>
            <span>Score</span>
            <span>Quizzes taken</span>
        </div>
        <div className='leaderboard_entries_container'>
            {leaderboard.map((el) => (<LeaderboardEntry key={el.user_id} leaderboardEntry={el} />))}
        </div>
        <div className='leaderboard_pagination_bar'>
            {<PaginationBar setPage={setPage} pagesCount={pagesCount} page={page} />}
        </div>
    </div>)
}

export default LeaderboardPage;