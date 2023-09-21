import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        if (data.get('email') == null || data.get('email') === '' || data.get('password') == null || data.get('password') === '') {
            alert("로그인 정보를 입력해주세요");
        }

        try {
            await axios({
                method: "post",
                url: "/reactBoard/users/signin",
                data: {
                    email: data.get('email'),
                    password: data.get('password'),
                },
            }).then((response) => {
                if (typeof response.data.error !== 'undefined') {
                    alert("회원 정보가 없습니다.")
                    return
                }
                // TODO: - save user information
                localStorage.clear()
                localStorage.setItem('userID', response.data.userID)
                localStorage.setItem('nickname', response.data.nickname)
                navigate('/')
            })
        } catch (error) {
            alert('Signin Error: ' + error)
        }
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// const SignIn = () => {
//     const navigate = useNavigate()
//
//     const [signInInformation, setSignInInformation] = useState({
//         email: '',
//         password: '',
//     });
//
//     const { email, password } = signInInformation
//
//     const signIn = async () => {
//         await axios.post('//localhost:3000/users/signIn').then(() => {
//             alert('로그인되었습니다.');
//             navigate('/');
//         });
//     };
//
//     const backToHome = () => {
//         navigate('/home');
//     };
//
//     const moveToSignUp = () => {
//         navigate('/signUp');
//     };
//
//     return (
//         <div>
//             <div>
//                 <span>Email</span>
//                 <input
//                     type="text"
//                     name="email"
//                     value={email}
//                 />
//             </div>
//             <br />
//             <div>
//                 <span>Password</span>
//                 <input
//                     type="password"
//                     name="password"
//                     value={password}
//                 />
//             </div>
//             <br />
//             <div>
//                 <button onClick={signIn}>SignIn</button>
//             </div>
//             <br />
//             <br />
//             <div>
//                 <button onClick={moveToSignUp}>signUp</button>
//             </div>
//         </div>
//     )
// }
// export default SignIn;