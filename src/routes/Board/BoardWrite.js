import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
    const navigate = useNavigate()

    const [board, setBoard] = useState({
        title: '',
        createdDate: '',
        contents: '',
    });

    const { title, createdDate, contents } = board;

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        await axios.post('//localhost:8000/board', board).then((res) => {
            alert('등록되었습니다.');
            navigate('/board');
        });
    };

    const backToList = () => {
        navigate('/board');
    };

    return (
        <div>
            <div>
                <span>Title</span>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <br/>
            <div>
                <span>Writer</span>
                <input
                    type="text"
                    name="createdDate"
                    value={createdDate}
                    onChange={onChange}
                />
            </div>
            <br/>
            <div>
                <span>Contents</span>
                <textarea
                    name="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={onChange}
                />
            </div>
            <br />
            <div>
                <button onClick={saveBoard}>Save</button>
                <button onClick={backToList}>Cancel</button>
            </div>
        </div>
    );
};

export default BoardWrite;