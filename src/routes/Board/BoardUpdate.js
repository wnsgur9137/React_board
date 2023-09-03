import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardUpdate = () => {
    const navigate = useNavigate();
    const { idx } = useParams()
    const [board, setBoard] = useState({
        idx: 0,
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

    const loadBoard = async () => {
        const resp = await (await axios.get(`//localhost:8000/board/${idx}`)).data;
        setBoard(resp.data);
    };

    const updateBoard = async () => {
        await axios.path('//locahost:8000/board', board).then((res) => {
            alert('수정되었습니다.');
            navigate('/board/' + idx);
        });
    };

    const backToDetail = () => {
        navigate('/board/' + idx);
    };

    useEffect(() => {
        loadBoard();
    }, []);

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
                <button onClick={updateBoard}>Edit</button>
                <button onClick={backToDetail}>Cancel</button>
            </div>
        </div>
    )
}

export default BoardUpdate;