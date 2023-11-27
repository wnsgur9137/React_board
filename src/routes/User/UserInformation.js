import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

import Network, {httpMethod} from "../../components/Infrastructure/Network";

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

export default function UserInformation() {
    const navigate = useNavigate();

    const [signUpInformation, setSignUpInformation] = useState({
        nickname: '',
        email: '',
        password: '',
    });
    const { nickname, email, password } = signUpInformation;

    const [userInformation, setUserInformation] = useState({
        nickname: "",
        email: "",
        updateDate: "",
    });
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditedUserInformation, setIsEditedUserInformation] = useState(false);
    const [isEnteredPassword, setIsEnteredPassword] = useState(false);
    const nicknameRegEx = /[A-Za-z0-9가-힣]{4,10}/
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

    useEffect(() => {
        console.log("useEffect");
        loadUserInformation();
    }, []);

    const loadUserInformation = async() => {
        const userID = localStorage.getItem('userID') || null;
        if (userID == null) {
            moveToHome()
            return
        }
        Network({
            httpMethod: httpMethod.get,
            url: `/reactBoard/users/${userID}`
        }).then((result) => {
            setUserInformation({
                nickname: result['nickname'],
                email: result['email'],
                updateDate: result['update_date'],
            });
        }).catch((error) => {
            alert(`회원 정보를 불러오지 못했습니다. ${error}`)
            moveToHome()
        })
    };

    const didTapEditButton = () => {
        setSignUpInformation({
            nickname: userInformation.nickname,
            email: userInformation.email,
            password: ''
        });
        setIsEditMode(true);
    };

    const didTapCancelEditButton = () => {
        loadUserInformation();
        window.location.reload();
    };

    const moveToHome = () => {
        navigate('/');
    };

    const handleSubmit = async(event) => {
        if (!isEditedUserInformation) {
            alert('회원 정보가 수정되지 않았습니다.');
            return
        }
        event.preventDefault();
        Network({
            httpMethod: httpMethod.post,
            url: '/reactBoard/users/update',
            parameter: {
                user_id: localStorage.getItem('userID'),
                email: email,
                nickname: nickname,
                password: password
            }
        }).then((result) => {
            console.log(`result: ${result}`)
            console.log(`result.userID: ${result['userID']}`)
            console.log(`result.email: ${result['email']}`)
            console.log(`result.nickname: ${result['nickname']}`)
            console.log(`result.updateDate: ${result['updateDate']}`)
            alert('수정되었습니다.');
            localStorage.setItem('nickname', result['nickname'])
            window.location.reload();
        }).catch((error) => {
            alert(`비밀번호가 일치하지 않습니다.\n ${error}`);
        })
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
        if (nickname.match(userInformation.nickname) &&
            nickname.length === userInformation.nickname.length) {
            setIsDisableNicknameDuplicatationButton(true);
            return
        }
        if (nickname.match(nicknameRegEx) === null) {
            setNicknameTextFieldError(true);
            setNicknameTextFieldColor('');
            setNicknameTextFieldHelperText('특수문자 제외 4자 이상 10자 이내로 작성해주세요')
            setIsDisableNicknameDuplicatationButton(true);
        } else {
            setNicknameTextFieldError(false);
            setNicknameTextFieldColor('');
            setNicknameTextFieldHelperText('')
            setIsDisableNicknameDuplicatationButton(false);
        }
    }

    const validationEmail = (email) => {
        if (email.match(userInformation.email) &&
            email.length === userInformation.email.length) {
            setIsDisableEmailDuplicatationButton(true);
            return
        }
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
            setIsEnteredPassword(false);
        } else {
            setPasswordTextFieldError(false);
            setPasswordTextFieldColor('');
            setPasswordTextFieldHelperText('');
            setIsEnteredPassword(true);
        }
    };

    const didTapDuplicationNickname = () => {
        if (nickname == null || nickname === '') {
            alert("닉네임을 입력해주세요");
            return
        }
        Network({
            httpMethod: httpMethod.get,
            url: `/reactBoard/users/duplicated/nickname/${nickname}`
        }).then((result) => {
            if (result.duplicated === false) {
                setIsEditedUserInformation(false);
                setNicknameTextFieldError(true);
                setNicknameTextFieldColor('');
                setNicknameTextFieldHelperText('중복된 닉네임입니다.');
                alert("중복된 닉네임입니다.")
            } else {
                setIsEditedUserInformation(true);
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
        Network({
            httpMethod: httpMethod.get,
            url: `/reactBoard/users/duplicated/email/${email}`,
        }).then((result) => {
            if (result.duplicated === false) {
                setIsEditedUserInformation(false);
                setEmailTextFieldError(true);
                setEmailTextFieldColor('');
                setEmailTextFieldHelperText('중복된 이메일입니다.');
                alert("중복된 이메일입니다.");
            } else {
                setIsEditedUserInformation(true);
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
                        My Information
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            {!isEditMode && (
                                <Grid item xs={12}>
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
                                            value={userInformation.nickname}
                                            disabled
                                            onChange={onChangeNicknameTextField}
                                        />
                                </Grid>
                            )}
                            {isEditMode && (
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
                            )}
                            {isEditMode && (
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
                            )}

                            {!isEditMode && (
                                <Grid item xs={12}>
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
                                        disabled
                                        value={userInformation.email}
                                        onChange={onChangeEmailTextField}
                                    />
                                </Grid>
                            )}
                            {isEditMode && (
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
                            )}
                            {isEditMode && (
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
                            )}


                            {isEditMode && (
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
                                        autoComplete="current-password"
                                        value={signUpInformation.password}
                                        onChange={onChangePasswordTextField}
                                    />
                                </Grid>
                            )}
                            {isEditMode && (
                                <Grid item xs={3}>
                                    <Button
                                        onClick={didTapCancelEditButton}
                                        variant="contained" >
                                        Cancel
                                    </Button>
                                </Grid>
                            )}
                            {isEditMode && (
                                <Grid item xs={3}>
                                    <Button
                                        onClick={didTapCancelEditButton}
                                        disabled
                                        variant="contained" >
                                        NEWPW
                                    </Button>
                                </Grid>
                            )}
                            {isEditMode && (
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={!isEditedUserInformation || !isEnteredPassword} >
                                        Edit
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                        {!isEditMode && (
                            <Button
                                onClick={didTapEditButton}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }} >
                                Edit Information
                            </Button>
                        )}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}