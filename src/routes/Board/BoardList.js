import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FeaturedPost from "../Home/FeaturedPost";

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
    const navigate = useNavigate()

    const [featuredPosts, setFeaturedPosts] = useState(defaultFeaturedPosts)

    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [preventBlock, setPreventBlock] = useState(0);
    const [nextBlock, setNextBlock] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

    const loadBoardList = async () => {
        if (search.page == currentPage) return;

        const queryString = Object.entries(search)
            .map((e) => e.join('='))
            .join('&');

        return
        const resp = (await axios.get('//localhost:3000/board' + queryString)).data;
        setBoardList(resp.data);

        const pngn = resp.pagination;

        const { endPage, nextBlock, preventBlock, startPage, totalPageCount } = pngn;

        setCurrentPage(search.page);
        setPreventBlock(preventBlock);
        setNextBlock(nextBlock);
        setLastPage(totalPageCount);

        const tempPages = [];
        for (let i = startPage; i <= endPage; i++) {
            tempPages.push(i);
        }

        setPageList(tempPages);
    }

    const moveToWrite = () => {
        navigate('/write')
    }

    const onClick = (event) => {
        let value = event.target.value;
        setSearch({
            ...search,
            page: value,
        });

        loadBoardList();
    };

    const onChange = (event) => {
        const { value, name } = event.target;
        setSearch({
            ...search,
            [name]: value,
        });
    };

    const onSearch = () => {
        if (search.sk !== '' && search.sv !== '') {
            setSearch({
                ...search,
                page: 1,
            });
            setCurrentPage(0);
            loadBoardList();
        }
    };

    useEffect(() => {
        loadBoardList();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.boardID} post={post} />
                        ))}
                    </Grid>
                    <ul>
                        {boardList.map((board) => (
                            <li key={board.idx}>
                                <link to={`/board/${board.idx}`}>{board.title}</link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={onClick} value={1}>&lt;&lt;</button>
                        <button onClick={onClick} value={preventBlock}>&lt;</button>
                        {pageList.map((page, index) => (
                            <button key={index} onClick={onClick} value={page}>{page}</button>
                        ))}
                        <button onClick={onClick} value={nextBlock}>&gt;</button>
                        <button onClick={onClick} value={lastPage}>&gt;&gt;</button>
                    </div>
                    <br/>
                    <div>
                        <select name="sk" onChange={onChange}>
                            <option value="">Select</option>
                            <option value="title">Title</option>
                            <option value="contents">Contents</option>
                        </select>
                        <input type="text" name="sv" id="" onChange={onChange} />
                        <button onClick={onSearch}>Search</button>
                    </div>
                    <div>
                        <button onClick={moveToWrite}>글쓰기</button>
                    </div>
                </main>
            </Container>
        </ThemeProvider>
    );
};

export default BoardList;