import React, { useState } from 'react';
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
                    content: board.contents,
                    writer: 'nickname',
                    user_id: 0
                }.then((response) => {
                    const data = response.data;
                    console.log(`board write response data: ${data}`);
                })
            });
        } catch (error) {
            alert("등록에 실패하였습니다.");
        }

        await axios.post('//localhost:8000/board', board).then((res) => {
            alert('등록되었습니다.');
            navigate('/board');
        });
    };

    const moveToList = () => {
        navigate('/board');
    };

    const handleSubmit = () => {

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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