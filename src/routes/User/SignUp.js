import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();

    const [signUpInformation, setSignUpInformation] = useState({
        nickname: '',
        email: '',
        password: '',
    });
    const { nickname, email, password } = signUpInformation;

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await axios({
                method: "post",
                url: "/reactBoard/users/signup",
                data: {
                    email: email,
                    nickname: nickname,
                    password: password
                },
            }).then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                alert('등록되었습니다.');
                moveToSignIn();
            });
        } catch (error) {
            alert(`회원가입에 실패하였습니다.\n ${error}`);
        }
    };

    const onChangeSignUpInformation = (event) => {
        // console.log(event.target.value)
        setSignUpInformation({
            ...signUpInformation,
            [event.target.name]: event.target.value,
        });
    };

    const didTapDuplicationNickname = () => {
        if (nickname == null || nickname === '') {
            alert("닉네임을 입력해주세요")
            return
        }

        axios({
            method: "get",
            url: "/reactBoard/users/duplicated/nickname",
            data: {
                nickname: nickname
            }
        }).then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    };

    const didTapDuplicationEmail = () => {
        if (email == null || email === '') {
            alert("이메일을 입력해주세요")
            return
        }

        axios({
            method: "get",
            url: "/reactBoard/users/duplicated/email",
            data: {
                email: email
            }
        }).then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    };

    const moveToSignIn = () => {
        navigate('/signIn');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={9}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nickname"
                                    required
                                    fullWidth
                                    id="nickname"
                                    label="Nickname"
                                    autoFocus
                                    value={signUpInformation.nickname}
                                    onChange={onChangeSignUpInformation}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    required
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: 50}}
                                    onClick={didTapDuplicationNickname}
                                >중복확인</Button>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={signUpInformation.email}
                                    onChange={onChangeSignUpInformation}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    required
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: 50 }}
                                    onClick={didTapDuplicationEmail}
                                >중복확인</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={signUpInformation.password}
                                    onChange={onChangeSignUpInformation}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}