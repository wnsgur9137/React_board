import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../../components/Board';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

const BoardDetail = () => {
    const { idx } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoard = async () => {
        await axios({
            method: 'get',
            url: `/reactBoard/boards/${idx}`
        }).then((response) => {
            console.log(response.data)
            const currentDateTime = new Date(response.data.createdDate.replace('/', '-').replace('/', '-').replace(/ /g, 'T')+'Z')
            const koreanDateTime = currentDateTime.toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
            });
            const boardData = {
                boardID: response.data.boardID,
                userID: response.data.userID,
                writer: response.data.writer,
                title: response.data.title,
                contents: response.data.contents,
                createdDate: koreanDateTime
            }
            setBoard(boardData);
            setLoading(false);
        });
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                {loading ? (
                    <h2>loading...</h2>
                ) : (
                    <Board
                        idx={board.idx}
                        title={board.title}
                        contents={board.contents}
                        createdDate={board.createdDate}
                        writer={board.writer}
                    />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default BoardDetail;