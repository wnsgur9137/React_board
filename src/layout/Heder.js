import React from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Sidebar from "./Sidebar/Sidebar";
import SidebarContents from "./Sidebar/SidebarContents";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";

const sidebar = {
    title: '202347013 이준혁',
    description:
        '웹 프레임워크 과제',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

function Header(props) {
    const navigate = useNavigate()
    const userID = localStorage.getItem('userID') || null;
    const nickname = localStorage.getItem('nickname') || null;

    const moveToHome = () => {
        navigate('/');
    };

    const moveToBoardList = () => {
        navigate('/board');
    };

    const moveToSignUp = () => {
        navigate('/signUp');
    };

    const moveToSignIn = () => {
        navigate('/signIn');
        window.location.reload();
    };

    const SignOut = () => {
        const userConfirmed = window.confirm("로그아웃 하시겠습니까?");
        if (userConfirmed) {
            localStorage.clear()
            navigate('/');
            window.location.reload();
        }
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small" onClick={moveToHome}>Home</Button>
                <Button size="small" onClick={moveToBoardList}>Board</Button>
                <Sidebar id="sidebar" width={320}>
                    {!userID && (
                        <Button variant="outlined" size="small" onClick={moveToSignIn}>
                            Sign in
                        </Button>
                    )}
                    {userID && (
                        <Button variant="outlined" size="small" onClick={SignOut}>
                            Sign out
                        </Button>
                    )}
                    <hr />
                    <SidebarContents
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        social={sidebar.social}
                    />
                </Sidebar>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {/*{title}*/}
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Grid container
                      spacing={2}
                      columns={{ xs: 4, md: 12 }}
                      justifyContent="flex-end">
                    <Grid item>
                    {!userID && (
                        <Button variant="outlined" size="small" onClick={moveToSignUp}>
                            Sign up
                        </Button>
                    )}
                    </Grid>
                    <Grid item>
                    {nickname && (
                        <Typography>{nickname}</Typography>
                    )}
                    </Grid>
                    <Grid item>
                    {userID && (
                        <Button variant="outlined" size="small">
                            Edit Information
                        </Button>
                    )}
                    </Grid>
                </Grid>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;

// const Header = () => {
//     return (
//         <header>
//             <a href="/">Home</a>
//             &nbsp;&nbsp; | &nbsp;&nbsp;
//             <a href="/board">Board</a>
//             &nbsp;&nbsp; | &nbsp;&nbsp;
//             <a href="/signIn">SignIn</a>
//             <hr/>
//         </header>
//     );
// };
//
// export default Header;