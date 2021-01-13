import React, { useState } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const ChangingTitle = (props) => {
    const [nameBox, setNameBox] = useState(0);
    const [bookName, setBookName] = useState(props.bookName);
    const [resetName, setResetName] = useState(bookName);
    const updateName = () => {
        fetch(`http://localhost:5000/admin/books/${props.bookId}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: bookName })
            }
        )
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .then(() => {
                setNameBox((prev) => !prev);
            })
    }

    return (<div >
        {nameBox ?
            <div className="bookName-change-option">
                <input className={'name-textbox'} type='textbox' value={bookName} onChange={(ev) => setBookName(ev.target.value)} />
                <CheckIcon onClick={updateName} />
                <ClearIcon onClick={() => {
                    setBookName(resetName);
                    setNameBox((prev) => !prev)
                }} />
            </div>
            : <div className="bookName-change">
                <h2 >{bookName}</h2>
                <BuildIcon onClick={() => {
                    setResetName(bookName);
                    setNameBox((prev) => !prev)
                }} />
            </div>
        }
    </div>)
}

export default ChangingTitle;