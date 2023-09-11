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

    const [nicknameTextFieldError, setNicknameTextFieldError] = useState(false);
    const [emailTextFieldError, setEmailTextFieldError] = useState(false);
    const [passwordTextFieldError, setPasswordTextFieldError] = useState(false);
    const [nicknameTextFieldHelperText, setNicknameTextFieldHelperText] = useState('');
    const [emailTextFieldHelperText, setEmailTextFieldHelperText] = useState('');
    const [passwordTextFieldHelperText, setPasswordTextFieldHelperText] = useState('');
    const [nicknameTextFieldColor, setNicknameTextFieldColor] = useState('');
    const [emailTextFieldColor, setEmailTextFieldColor] = useState('');
    const [passwordTextFieldColor, setPasswordTextFieldColor] = useState('')
    const [isDisableNicknameDuplicationButton, setIsDisableNicknameDuplicatationButton] = useState(true);
    const [isDisableEmailDuplicationButton, setIsDisableEmailDuplicatationButton] = useState(true);
    const [isDisableSignupButton, setIsDisableSignupButton] = useState(true);
    const nicknameRegEx = /[A-Za-z0-9가-힣]{4,10}/
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

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

    const onChangeNicknameTextField = (event) => {
        onChangeSignUpInformation(event);
        validationNickname(event.target.value);
    };

    const onChangeEmailTextField = (event) => {
        onChangeSignUpInformation(event);
        validationEmail(event.target.value);
    };

    const onChangePasswordTextField = (event) => {
        onChangeSignUpInformation(event);
        validationPassword(event.target.value);
    };

    const validationNickname = (nickname) => {
        if (nickname.match(nicknameRegEx) === null) {
            setNicknameTextFieldError(true);
            setNicknameTextFieldColor('');
            setNicknameTextFieldHelperText('특수문자 제외 4자 이상 10자 이내로 작성해주세요')
            setIsDisableNicknameDuplicatationButton(true);
            setIsDisableSignupButton(true);
        } else {
            setNicknameTextFieldError(false);
            setNicknameTextFieldColor('');
            setNicknameTextFieldHelperText('')
            setIsDisableNicknameDuplicatationButton(false);
            setIsDisableSignupButton(false);
        }
    }

    const validationEmail = (email) => {
        if (email.match(emailRegEx) === null) {
            setEmailTextFieldError(true);
            setEmailTextFieldColor('');
            setEmailTextFieldHelperText('이메일 형식에 맞게 입력해주세요');
            setIsDisableEmailDuplicatationButton(true);
        } else {
            setEmailTextFieldError(false);
            setEmailTextFieldColor('');
            setEmailTextFieldHelperText('');
            setIsDisableEmailDuplicatationButton(false);
        }
    };

    const validationPassword = (password) => {
        if (password.match(passwordRegEx) === null) {
            setPasswordTextFieldError(true);
            setPasswordTextFieldColor('');
            setPasswordTextFieldHelperText('대문자, 소문자, 특수문자 포함 8자 이상으로 작성해주세요');
        } else {
            setPasswordTextFieldError(false);
            setPasswordTextFieldColor('');
            setPasswordTextFieldHelperText('');
        }
    };

    const didTapDuplicationNickname = () => {
        if (nickname == null || nickname === '') {
            alert("닉네임을 입력해주세요");
            return
        }
        axios({
            method: "get",
            url: "/reactBoard/users/duplicated/nickname/" + nickname,
        }).then((response) => {
            if (response.data.duplicated == false) {
                setNicknameTextFieldError(true);
                setNicknameTextFieldColor('');
                setNicknameTextFieldHelperText('중복된 닉네임입니다.');
                alert("중복된 닉네임입니다.")
            } else {
                setNicknameTextFieldColor('success');
                setNicknameTextFieldError(false);
                setNicknameTextFieldHelperText('사용 가능한 닉네임입니다.');
            }
        }).catch((error) => {
            alert("Error: " + error)
        });
    };

    const didTapDuplicationEmail = () => {
        if (email == null || email === '') {
            alert("이메일을 입력해주세요");
            return
        }
        axios({
            method: "get",
            url: "/reactBoard/users/duplicated/email/" + email,
        }).then((response) => {
            if (response.data.duplicated === false) {
                setEmailTextFieldError(true);
                setEmailTextFieldColor('');
                setEmailTextFieldHelperText('중복된 이메일입니다.');
                alert("중복된 이메일입니다.");
            } else {
                setEmailTextFieldError(false);
                setEmailTextFieldColor('success');
                setEmailTextFieldHelperText('사용 가능한 이메일입니다.');
            }
        }).catch((error) => {
            alert("Error: " + error);
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
                                    error={nicknameTextFieldError}
                                    color={nicknameTextFieldColor}
                                    helperText={nicknameTextFieldHelperText}
                                    autoComplete="given-name"
                                    name="nickname"
                                    required
                                    fullWidth
                                    id="nickname"
                                    label="Nickname"
                                    autoFocus
                                    value={signUpInformation.nickname}
                                    onChange={onChangeNicknameTextField}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    required
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: 50}}
                                    onClick={didTapDuplicationNickname}
                                    disabled={isDisableNicknameDuplicationButton}
                                >중복확인</Button>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    error={emailTextFieldError}
                                    color={emailTextFieldColor}
                                    helperText={emailTextFieldHelperText}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={signUpInformation.email}
                                    onChange={onChangeEmailTextField}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    required
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: 50 }}
                                    onClick={didTapDuplicationEmail}
                                    disabled={isDisableEmailDuplicationButton}
                                >중복확인</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordTextFieldError}
                                    color={passwordTextFieldColor}
                                    helperText={passwordTextFieldHelperText}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={signUpInformation.password}
                                    onChange={onChangePasswordTextField}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isDisableSignupButton}
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