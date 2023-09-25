import React, {useEffect, useState} from 'react';
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

import AlertWithTextField from "./AlertWithTextField";

const defaultTheme = createTheme();

const Board = ({ boardID, title, contents, createdDate, writer, userID }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const isOpenMenu = Boolean(anchorEl);
    const localUserID = localStorage.getItem("userID") || null;

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios({
                method: "delete",
                url: `/reactBoard/boards/delete/${userID}/${boardID}`,
            }).then((response) => {
                if (response.data["Error"]) {
                    alert(`삭제에 실패하였습니다.\n다시 시도해주세요.`)
                    return
                }
                alert('삭제되었습니다.');
                console.log(response.data)
                navigate('/board');
            }).catch((error) => {
                alert(`삭제에 실패하였습니다.\n${error}`)
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
        navigate(`/board/update/${boardID}`);
    };

    const reportBoard = () => {
        setAlertOpen(true);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                {isAlertOpen && <AlertWithTextField
                    title={"Report"}
                    description={"Description"}
                    completedMessage={"신고되었습니다."} />}
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
                            onClick={menuClick}>
                            Menu
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
                            {parseInt(localUserID) === parseInt(userID) && (
                                <MenuItem onClick={moveToUpdate}><EditIcon /> Edit</MenuItem>
                            )}
                            {parseInt(localUserID) === parseInt(userID) && (
                                <MenuItem onClick={deleteBoard}><DeleteIcon />Delete</MenuItem>
                            )}
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