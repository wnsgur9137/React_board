import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

const BoardWrite = () => {
    const navigate = useNavigate()
    const userID = localStorage.getItem("userID") || null;
    const nickname = localStorage.getItem("nickname") || null;

    const [board, setBoard] = useState({
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

    const saveBoard = async () => {
        try {
            await axios({
                method: "post",
                url: '/reactBoard/boards',
                data: {
                    title: board.title,
                    contents: board.contents,
                    writer: nickname,
                    user_id: userID
                }
                }).then((response) => {
                    const url = `/board/${response.data.boardID}`
                    navigate(url)
                })
        } catch (error) {
            alert(`등록에 실패하였습니다.\n${error}`);
        }
    };

    useEffect(() => {
        if (userID === null || nickname === null) {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box component="form" noValidate onSubmit={saveBoard} sx={{ mt: 3 }}>
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
                                onClick={saveBoard}
                                disabled={board.title.length === 0 || board.contents.length === 0}
                            >SAVE</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default BoardWrite;