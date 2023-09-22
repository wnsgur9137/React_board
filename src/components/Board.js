import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import {Menu, MenuItem} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report'
import {StyledMenu} from "./CustomStyle/Menu";

const defaultTheme = createTheme();

const Board = ({ idx, title, contents, createdDate, writer }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenMenu = Boolean(anchorEl);

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8000/board/${idx}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    };

    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const menuClose = () => {
        setAnchorEl(null);
    };

    const moveToUpdate = () => {
        navigate('/update/' + idx);
    };

    const reportBoard = () => {
        alert('신고되었습니다.');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="h2" component="h2" xs={12}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            id="edit-button"
                            variant="contained"
                            endIcon={<KeyboardArrowDownIcon />}
                            aria-controls={isOpenMenu ? 'edit-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isOpenMenu ? 'true' : undefined}
                            onClick={menuClick}
                            >
                            EDIT
                        </Button>
                        <StyledMenu
                            id={"edit-menu"}
                            anchorEl={anchorEl}
                            open={isOpenMenu}
                            onClose={menuClose}
                            endIcon={<KeyboardArrowDownIcon />}
                            menuLIstProps={{
                                'aria-labelledby': 'menu-button',
                            }}>
                            <MenuItem onClick={moveToUpdate}><DeleteIcon /> Edit</MenuItem>
                            <MenuItem onClick={deleteBoard}><EditIcon />Delete</MenuItem>
                            <MenuItem onClick={reportBoard}><ReportIcon />Report</MenuItem>
                        </StyledMenu>
                    </Grid>
                    <Grid item container xs={6} justifyContent="flex-front" alignItems="center">
                        <Typography variant="subtitle1" component="h2">
                            {writer}
                        </Typography>
                    </Grid>
                    <Grid item container xs={6} justifyContent="flex-end" alignItems="center">
                        <Typography variant="subtitle2" component="h2">
                            {createdDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} height={900}>
                        <Typography variant="body1" component="h2">
                            {contents}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Board;