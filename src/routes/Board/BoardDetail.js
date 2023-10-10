import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../../components/Presentation/Board';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Network, {httpMethod} from "../../components/Infrastructure/Network";


const defaultTheme = createTheme();

const BoardDetail = () => {
    const { boardID } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const getBoard = async () => {
        Network({
            httpMethod: httpMethod.get,
            url: `/reactBoard/boards/${boardID}`
        }).then((result) => {
            const currentDateTime = new Date(result.createdDate.replace('/', '-').replace('/', '-').replace(/ /g, 'T')+'Z')
            const koreanDateTime = currentDateTime.toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
            });
            const boardData = {
                boardID: result.boardID,
                userID: result.userID,
                writer: result.writer,
                title: result.title,
                contents: result.contents,
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
                        boardID={board.boardID}
                        title={board.title}
                        contents={board.contents}
                        createdDate={board.createdDate}
                        writer={board.writer}
                        userID={board.userID}
                    />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default BoardDetail;