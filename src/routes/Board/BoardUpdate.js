import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Network, {httpMethod} from "../../components/Infrastructure/Network";

const defaultTheme = createTheme();

const BoardUpdate = () => {
    const navigate = useNavigate();
    const { boardID } = useParams()
    const userID = localStorage.getItem("userID") || null;
    const [board, setBoard] = useState({
        boardID: 0,
        userID: 0,
        writer: '',
        title: '',
        contents: '',
        createdDate: '',
    });
    const [originalContents, setOriginalContents] = useState({
        title: '',
        contents: '',
    });

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const loadBoard = async () => {
        Network({
            httpMethod: httpMethod.get,
            url: `/reactBoard/boards/${boardID}`
        }).then((result) => {
            console.log(result)
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
            };
            setBoard(boardData);
            setOriginalContents({
                title: result.title,
                contents: result.contents
            });
        }).catch((error) => {
            alert('Error: ', error)
        })
    };

    const updateBoard = async () => {
        Network({
            httpMethod: httpMethod.post,
            url: '/reactBoard/boards/update',
            parameter: {
                board_id: board.boardID,
                title: board.title,
                contents: board.contents,
                user_id: userID
            }
        }).then((result) => {
            if (result["Error"]) {
                alert("수정에 실패하였습니다.\n다시 시도해주세요.");
                console.log(result["Error"])
                return
            }
            console.log(result)
            backToDetail();
        }).catch((error) => {
            alert(`수정에 실패하였습니다.\nerror: ${error}`)
        });
    };

    const backToDetail = () => {
        navigate(`/board/${boardID}`);
    };

    useEffect(() => {
        loadBoard();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box component="form" noValidate onSubmit={updateBoard} sx={{ mt: 3 }}>
                    <Grid container
                          justifyContent="center"
                          alignItems="center"
                          spacig={4}
                          rowSpacing={4}
                          sx={{ mt: 3 }}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                value={board.title}
                                fullWidth
                                onChange={onChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="contents"
                                label="Contents"
                                value={board.contents}
                                fullWidth
                                multiline
                                rows={10}
                                onChange={onChange} />
                        </Grid>
                        <Grid item container xs={12} justifyContent="flex-end">
                            <Button
                                variant="contained"
                                // type="submit"
                                onClick={updateBoard}
                                disabled={
                                    (board.title.length === 0) ||
                                    (board.contents.length === 0) ||
                                    (board.title === originalContents.title && board.contents === originalContents.contents)
                                }
                            >SAVE</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default BoardUpdate;