import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import SidebarContents from "./SidebarContents";
import Chart from '../../components/LineChart';

const defaultMainFeaturedPost = {
    boardID: 0,
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

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

const posts = [post1, post2, post3];

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const defaultChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [1, 2, 3, 4, 5],
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [1, 2, 3, 4, 5, 6],
            borderColor: 'red',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [1, 2, 3, 4, 5, 6],
        },
    ],
};

export default function Blog() {
    const [mainFeaturedPost, setMainFeaturedPost] = useState(defaultMainFeaturedPost);
    const [featuredPosts, setFeaturedPosts] = useState(defaultFeaturedPosts)
    const [coreTempChartData, setCoreTempChartData] = useState(defaultChartData);
    const [sensorChartData, setSensorChartData] = useState(defaultChartData);

    const loadBoards = async () => {
        // return
        await axios({
            method: "get",
            url: "/reactBoard/boards/main"
        }).then((response) => {
            console.log(response.data);
            const jsonArray = response.data;
            const test = []
            for (var i = 0; i < 3; i++) {
                if (i === 0) {
                    setMainFeaturedPost({
                        boardID: jsonArray[0].boardID,
                        title: jsonArray[0].title,
                        description: jsonArray[0].contents,
                        image: 'https://source.unsplash.com/random?wallpapers',
                        imageText: 'main image description',
                        linkText: 'Continue reading...'
                    });
                } else {
                    test.push({
                        boardID: jsonArray[i].boardID,
                        title: jsonArray[i].title,
                        description: jsonArray[i].contents,
                        date: jsonArray[i].createdDate,
                        image: 'https://source.unsplash.com/random?wallpapers',
                        imageLabel: 'Image Text',
                        linkText: 'Continue reading...',
                    })
                }
            }
            setFeaturedPosts(test)
        }).catch(error => {
            alert("ServerError: " + error)
            setMainFeaturedPost({
                title: 'Server Error',
                    description: "ServerError",
                    image: '',
                imageText: 'ServerError',
                linkText: 'ServerError',
            });
        });
    };

    const loadServerSensors = async() => {
        await axios({
            method: "get",
            url: "/reactBoard/sensor-mock"
        }).then((response) => {
            const jsonArray = response.data
            const chartLabels = []
            const sensorChartData = []
            const coreChartData = []
            const appleSmcItems = jsonArray.sensorQueue[0]["applesmc-isa-0300"]["Adapter: ISA adapter"]
            const coreTempItems = jsonArray.sensorQueue[0]["coretemp-isa-0000"]["Adapter: ISA adapter"]
            // for (const key in appleSmcItems) {
            //     sensorChartLabels.push(key)
            //     const numericPart = appleSmcItems[key].match(/[+-]?\d+(\.\d+)?/);
            //     if (numericPart) {
            //         sensorChartData.push(parseFloat(numericPart))
            //     }
            // }
            jsonArray.sensorQueue.forEach((response) => {
                const responseItem = response["applesmc-isa-0300"]["Adapter: ISA adapter"]
                for (const key in responseItem) {
                    // console.log(key)
                    // console.log(responseItem[key])
                    // console.log()
                }
            });
            // for (const key in coreTempItems) {
            //     coreChartLabels.push(key)
            //     const numericPart = coreTempItems[key].match(/([+-]?\d+\.\d+)°C/);
            //     if (numericPart) {
            //         coreChartData.push(parseFloat(numericPart[1]))
            //     }
            // }

            // labels
            jsonArray.sensorQueue.forEach((response) => {
                chartLabels.push(response["date"]);
            });
            const currentSensorChartData = defaultChartData
            currentSensorChartData.lables = chartLabels
            console.log(currentSensorChartData.lables)
            setSensorChartData(currentSensorChartData)
            setSensorChartData.labels = chartLabels
            setCoreTempChartData.labels = chartLabels
        });
    }

    const loadServerMemory = async() => {
        await axios({
            method: "get",
            url: "/reactBoard/memory-mock"
        }).then((response) => {
            const jsonArray = response.data
            console.log("memory:")
            console.log(jsonArray)
        })
    }

    useEffect(() => {
        loadBoards();
        loadServerSensors();
        loadServerMemory();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost id="mainFeaturedPostComponent" post={mainFeaturedPost} />
                    <div>
                        <Chart chartData={sensorChartData} />
                        <Chart chartData={coreTempChartData} />
                    </div>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.boardID} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Main title="From the firehose" posts={posts} />
                        <SidebarContents
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}