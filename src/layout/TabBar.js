import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home"
import ContentPaste from "@mui/icons-material/ContentPaste";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from '@mui/icons-material/Search';

function TabBar() {
    const navigate = useNavigate()

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
        <Grid container
              height="7%"
              width="96%"
              justifyContent="center"
              alignItems="stretch"
              sx={{
                  borderRadius: '20px',
                  boxShadow: 5,
                  backgroundColor: 'white',
                  position: 'fixed',
                  left: '50%',
                  bottom: '0%',
                  transform: 'translate(-50%, -50%)',
              }}>
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
    )
}

export default TabBar;