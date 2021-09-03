import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch';
import PaginationBar from '../historyPage/PaginationBar';
import SimpleQuizView from './SimpleQuizView';
import './QuizzesInCategory.css'

const QuizzesInCategory = (props) => {

    const LIMIT = 5;
    const { id } = props.match.params;
    const fetchFunc = useAuthorizedRequest();
    const history = useHistory();
    const [quizzes, setQuizzes] = useState([]);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    useEffect(() => {

        const fetchData = async (limit) => {
            try {
                const offset = (page - 1) * limit;
                const { category, quizzes, count } = await fetchFunc(`/categories/${id}/quizzes`, 'GET', { query: { limit, offset } });
                if (!category) {
                    history.push('/*');
                }
                else {
                    setQuizzes(quizzes);
                    setCategory(category);
                    setPagesCount(Math.ceil(count / limit) || 1);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchData(LIMIT);
    }, [LIMIT, page]);

    const viewOnClick = (quizId) => () => {
        history.push(`/quizzes/${quizId}/users`)
    }

    return (
        <div className='category_quizzes_container'>
            <div className='category_quizzes_header'>
                <h1>{category}</h1>
            </div>
            <div className='category_quizzes_explanations_conteiner'>
                <span>quiz title</span>
                <span>time-limit</span>
                <span>made by</span>
            </div>
            <div className='category_quizzes_entries_container'>
                {quizzes.map((el) => {
                    return <SimpleQuizView view={viewOnClick(el.id)} key={el.id} quiz={el} />
                })}
            </div>
            <div className='category_quizzes_pagination'>
                {<PaginationBar setPage={setPage} pagesCount={pagesCount} page={page} />}
            </div>
        </div>
    )
}

export default withRouter(QuizzesInCategory);
