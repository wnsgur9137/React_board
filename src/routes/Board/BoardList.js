import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FeaturedPost from "../../components/FeaturedPost";
import {ButtonGroup, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const defaultTheme = createTheme();

const defaultFeaturedPosts = [
    {
        boardID: 0,
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
    {
        boardID: 1,
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
];

const BoardList = () => {
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const [featuredPosts, setFeaturedPosts] = useState(defaultFeaturedPosts)
    const [filter, setFilter] = useState('title');
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(window.matchMedia("(min-width: 1024px)").matches ? 10 : 4);
    const [writer, setWriter] = useState('');
    const [page, setPage] = useState(1);
    const [allPageList, setAllPageList] = useState([]);
    const [adjacentPageList, setAdjacentPageList] = useState([]);

    const loadBoards = async () => {
        await axios({
            method: "get",
            url: `/reactBoard/boards?page=${page}&limit=${limit}&keyword=${keyword}&filter=${filter}&writer=${writer}`,
        }).then((response) => {
            console.log(response.data) // TEST
            const jsonArray = response.data;
            const temp = []
            for (let i=1; i<=Math.ceil((jsonArray.count / limit)); i++) {
                temp.push(i)
            }
            setAllPageList(temp)

            const boardItems = []
            jsonArray.boards.forEach((board) => {
                const item = {
                    boardID: board.boardID,
                    title: board.title,
                    description: board.contents,
                    image: 'https://source.unsplash.com/random?wallpapers',
                    imageText: 'image description',
                    linkText: 'Continue reading...'
                };
                boardItems.push(item);
            });
            setFeaturedPosts(boardItems)
        }).catch(error => {
            alert(`Error: Server error ${error}`)
        });
    };

    const setAdjacentPage = (currentPage) => {
        let temp = []
        let count = 0
        switch (parseInt(currentPage)) {
            case 1:
            case 2:
            case 3:
                count = Math.min(allPageList.length, 5)
                for (let i=1; i<=count; i++) {
                    temp.push(i)
                }
                setAdjacentPageList(temp)
                break;

            case allPageList.slice(-2)[0]:
            case allPageList.slice(-1)[0]:
                count = -Math.min(allPageList.length, 5)
                for (let i=count; i<0; i++) {
                    temp.push(allPageList.slice(i)[0])
                }
                setAdjacentPageList(temp)
                break;

            default:
                const currentPage = parseInt(page)
                for (let i=(currentPage-2); i<=(currentPage+2); i++) {
                    temp.push(i)
                }
                setAdjacentPageList(temp)
        }
    };

    const moveToWrite = () => {
        navigate('/write')
    };

    const didChangeLimit = (event) => {
        const { value, } = event.target;
        if (value.length === 0) { return }
        setLimit(value);
    };

    const didChangePage = (event) => {
        const { value, } = event.target;
        switch (value) {
            case 'first':
                setPage(1);
                break;
            case 'prevent':
                setPage(page - 1);
                break;
            case 'next':
                setPage(page + 1);
                break;
            default:
                setPage(allPageList.slice(-1)[0])
        }
    };

    const onClickPageNumber = (event) => {
        const { value, } = event.target;
        setPage(value)
    };

    const didChangeFilter = (event) => {
        const { value, } = event.target;
        setFilter(value);
    };

    const didChangeKeyword = (event) => {
        const { value, } = event.target;
        setKeyword(value);
    };

    const onClickSearch = () => {
        loadBoards()
    };

    useEffect(() => {
        loadBoards();
    }, [page, filter, limit]);

    useEffect(() => {
        if (page > allPageList.length) {
            setPage(1)
        }
        setAdjacentPage(page)
    }, [allPageList])

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item container spacing={2} justifyContent="flex-end">
                            <Grid item>
                                <TextField
                                    required
                                    label="Limit"
                                    defaultValue={limit}
                                    size="small"
                                    onChange={didChangeLimit}/>
                            </Grid>
                            {userID && (
                                <Grid item>
                                    <Button variant="contained" onClick={moveToWrite}>글쓰기</Button>
                                </Grid>
                            )}
                        </Grid>

                        <Grid item spacing={1} container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Select
                                    value={filter}
                                    label="Title"
                                    size="small"
                                    onChange={didChangeFilter}>
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="contents">Contents</MenuItem>
                                    <MenuItem value="title_contents">Title+Contents</MenuItem>
                                    <MenuItem value="writer">Writer</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item>
                                <TextField type="text" name="sv" size="small" onChange={didChangeKeyword} />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={onClickSearch}>Search</Button>
                            </Grid>
                        </Grid>

                        <Grid item container spacing={4}>

                            {featuredPosts.map((post) => (
                                <FeaturedPost key={post.boardID} post={post} />
                            ))}

                            <Grid item container justifyContent="center">
                                <ButtonGroup variant="outlined">
                                    <Button disabled={parseInt(page) === 1} variant="contained" size="small" value={'first'} onClick={didChangePage}>&lt;&lt;</Button>
                                    <Button disabled={parseInt(page) === 1} variant="contained" size="small" value={'prevent'} onClick={didChangePage}>&lt;</Button>
                                    {adjacentPageList.map((pageNumber, index) => (
                                        <Button value={pageNumber} disabled={parseInt(page) === pageNumber} size="small" onClick={onClickPageNumber}>{pageNumber}</Button>
                                    ))}
                                    <Button disabled={parseInt(page) === allPageList.slice(-1)[0] || allPageList.length === 0} variant="contained" size="small" value={'next'} onClick={didChangePage}>&gt;</Button>
                                    <Button disabled={parseInt(page) === allPageList.slice(-1)[0] || allPageList.length === 0} variant="contained" size="small" value={'last'} onClick={didChangePage}>&gt;&gt;</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
};

export default BoardList;