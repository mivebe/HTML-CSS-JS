import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom'
import './ScoreModal.css'

const ScoreModal = ({ score }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/');
    }

    const body = (
        <div className='solve_quiz_score_modal_conteiner'>
            <div className='solve_quiz_score_modal'>
                <h2 id="simple-modal-title">Your score is {score} points!</h2>
                <p id="simple-modal-description">
                    Keep up the hard work!</p>
                <button onClick={handleClick}>Go back to dashboard</button>
            </div>
        </div>
    );

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default ScoreModal