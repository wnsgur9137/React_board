import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home"
import ContentPaste from "@mui/icons-material/ContentPaste";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from '@mui/icons-material/Search';

function TabBar() {
    const navigate = useNavigate()
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);

    const moveToHome = () => {
        navigate('/');
    };

    const moveToBoard = () => {
        navigate('/board');
    };

    const moveToSearch = () => {
        navigate('/saerch');
    };

    const moveToMyPage = () => {
        navigate('/myPage');
    };

    return (
        <Box
            component="tabBar"
            sx={{
                // border: 1,
                mt: 3,
                borderRadius: '20px',
                py: 6,
                height: '5%',
                boxShadow: 3
            }}
            style={{
                left: 0,
                bottom: 0,
                position: 'fixed',
                width: '100%',
                // height: '15px',
                backgroundColor: 'white'
            }}>
            <Grid container
                  spacing={2}
                  height="100%"
                  width="100%"
                  justifyContent="center"
                  alignItems="stretch">
                <Grid item container justifyContent="center" alignItems="stretch" xs={3}>
                    <Button onClick={moveToHome}><HomeIcon /></Button>
                </Grid>
                <Grid item container justifyContent="center" alignItems="stretch" xs={3}>
                    <Button onClick={moveToBoard}><ContentPaste /></Button>
                </Grid>
                <Grid item container justifyContent="center" alignItems="stretch" xs={3}>
                    <Button onClick={moveToSearch}><SearchIcon /></Button>
                </Grid>
                <Grid item container justifyContent="center" alignItems="stretch" xs={3}>
                    <Button onClick={moveToMyPage}><PersonIcon /></Button>
                </Grid>
            </Grid>
        </Box>
    )
};

export default TabBar;