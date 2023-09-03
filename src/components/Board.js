import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Board = ({ idx, title, contents, createdDate }) => {
    const navigate = useNavigate()

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8000/board/${idx}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    };

    const moveToUpdate = () => {
        navigate('/update/' + idx);
    };

    const moveToList = () => {
        navigate('/board');
    };

    return (
        <div>
            <div>
                <h2>{title}</h2>
                <h5>{createdDate}</h5>
                <hr/>
                <p>{contents}</p>
            </div>
            <div>
                <button onClick={moveToUpdate}>Edit</button>
                <button onClick={deleteBoard}>Delete</button>
                <button onClick={moveToList}>List</button>
            </div>
        </div>
    )
}

export default Board;