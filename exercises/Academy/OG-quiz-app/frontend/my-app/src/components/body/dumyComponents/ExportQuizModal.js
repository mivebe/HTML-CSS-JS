import React from 'react';
import Modal from '@material-ui/core/Modal';
import ExportQuiz from '../createQuiz/exportQuiz/ExportQuiz';

const ExportQuizModal = ({ toExport, handleClick }) => {
    const body = (
        <div className='export_quiz_modal_conteiner'>
            <div className='export_quiz_button_modal'>
                {toExport && <ExportQuiz toExport={toExport} />}
                <button onClick={handleClick}>Go back to create quiz form</button>
            </div>
        </div>
    );

    return (
        <div>
            <Modal
                open={true}
            >
                {body}
            </Modal>
        </div>
    );
}

export default ExportQuizModal