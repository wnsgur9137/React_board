import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainFeaturedPost from '../../components/MainFeaturedPost';
import FeaturedPost from '../../components/FeaturedPost';
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
    const [memoryChartData, setMemoryChartData] = useState(defaultChartData);
    const [swapChartData, setSwapChartData] = useState(defaultChartData);

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

    const randomRGB = () => {
        const min = 50;
        const max = 255;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            rgb[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }

    const loadServerSensors = async() => {
        await axios({
            method: "get",
            url: "/reactBoard/sensor-mock"
        }).then((response) => {
            const jsonArray = response.data;

            // label key
            const appleSmcLabelKeys = [];
            const coreTempLabelKeys = [];
            const appleSmcItems = jsonArray.sensorQueue[0]["applesmc-isa-0300"]["Adapter: ISA adapter"];
            const coreTempItems = jsonArray.sensorQueue[0]["coretemp-isa-0000"]["Adapter: ISA adapter"];
            for (const key in appleSmcItems) {
                appleSmcLabelKeys.push(key);
            }
            for (const key in coreTempItems) {
                coreTempLabelKeys.push(key);
            }

            // data
            const chartLabels = [];
            const sensorDataDictionary = {};
            const coreTempDataDictionary = {};
            jsonArray.sensorQueue.forEach((response) => {
                // chartLabel
                const currentDateTime = new Date(response["date"].replace('/', '-').replace('/', '-').replace(/ /g, 'T')+'Z')
                const koreanDateTime = currentDateTime.toLocaleTimeString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                });
                const response_date = response["date"].split(' ')[1];
                chartLabels.push(koreanDateTime);

                // apple smc items
                const applesmcItems = response["applesmc-isa-0300"]["Adapter: ISA adapter"];
                for (const key in applesmcItems) {
                    if (!sensorDataDictionary[key]) {
                        sensorDataDictionary[key] = [];
                    }
                    sensorDataDictionary[key].push(parseFloat(applesmcItems[key]));
                }

                // core temp items
                const coreTempItems = response["coretemp-isa-0000"]["Adapter: ISA adapter"];
                for (const key in coreTempItems) {
                    if (!coreTempDataDictionary[key]) {
                        coreTempDataDictionary[key] = [];
                    }
                    const regex = /([\+\-]?\d+\.\d+)/;
                    const match = coreTempItems[key].match(regex);
                    if (match) {
                        const extractedNumber = parseFloat(match[0]);
                        coreTempDataDictionary[key].push(extractedNumber);
                    }
                }
            });

            const sensorChartData = {
                labels: chartLabels,
                datasets: []
            }
            const coreTempChartData = {
                labels: chartLabels,
                datasets: []
            }

            appleSmcLabelKeys.forEach((key) => {
                const data = {
                    type: 'line',
                    label: key,
                    borderColor: `${randomRGB()}`,
                    borderWidth: 2,
                    data: sensorDataDictionary[key],
                }
                sensorChartData.datasets.push(data);
            });
            coreTempLabelKeys.forEach((key) => {
                const data = {
                    type: 'line',
                    label: key,
                    borderColor: `${randomRGB()}`,
                    borderWidth: 2,
                    data: coreTempDataDictionary[key],
                }
                coreTempChartData.datasets.push(data);
            });

            setSensorChartData(sensorChartData);
            setCoreTempChartData(coreTempChartData);
        });
    }

    const loadServerMemory = async() => {
        await axios({
            method: "get",
            url: "/reactBoard/memory-mock"
        }).then((response) => {
            const jsonArray = response.data;

            const memoryLabelKeys = [];
            const swapLabelKeys = [];
            for (const key in jsonArray.memoryQueue[0]["memory"]) {
                memoryLabelKeys.push(key);
            }
            for (const key in jsonArray.memoryQueue[0]["swap"]) {
                swapLabelKeys.push(key);
            }

            // data
            const chartLabels = [];
            const memoryDataDictionary = {};
            const swapDataDictionary = {};
            jsonArray.memoryQueue.forEach((response) => {
                // chartLabel
                const currentDateTime = new Date(response["date"].replace('/', '-').replace('/', '-').replace(/ /g, 'T')+'Z')
                const koreanDateTime = currentDateTime.toLocaleTimeString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                });
                chartLabels.push(koreanDateTime);

                // memory information items
                const memoryItems = response["memory"];
                for (const key in memoryItems) {
                    if (!memoryDataDictionary[key]) {
                        memoryDataDictionary[key] = [];
                    }
                    let value = memoryItems[key];
                    if (key === 'available' || key === 'total' || key === 'used') {
                        value = value / 1000 / 1000;
                    }
                    memoryDataDictionary[key].push(value)
                }

                // swap memory information items
                const swapItems = response["swap"];
                for (const key in swapItems) {
                    if (!swapDataDictionary[key]) {
                        swapDataDictionary[key] = [];
                    }
                    let value = swapItems[key];
                    if (key === 'available' || key === 'total' || key === 'used') {
                        value = value / 1000 / 1000;
                    }
                    swapDataDictionary[key].push(value);
                }
            });

            const memoryChartData = {
                labels: chartLabels,
                datasets: []
            }
            const swapChartData = {
                labels: chartLabels,
                datasets: [],
            }

            memoryLabelKeys.forEach((key) => {
                const data = {
                    type: 'line',
                    label: key,
                    borderColor: `${randomRGB()}`,
                    borderWidth: 2,
                    data: memoryDataDictionary[key],
                }
                memoryChartData.datasets.push(data);
            });
            swapLabelKeys.forEach((key) => {
                const data = {
                    type: 'line',
                    label: key,
                    borderColor: `${randomRGB()}`,
                    borderWidth: 2,
                    data: swapDataDictionary[key],
                }
                swapChartData.datasets.push(data);
            });

            setMemoryChartData(memoryChartData);
            setSwapChartData(swapChartData);
        });
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
                    <Divider />
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacig={4}
                          sx={{ mt: 3 }}>
                        <Divider>SENSORS (°C)</Divider>
                        <Chart id="sensorChart" chartData={sensorChartData} />
                    </Grid>
                    <Divider />
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacig={4}
                          sx={{ mt: 3}}>
                        <Divider>CORE TEMP (°C)</Divider>
                        <Chart id="coreTempChart" chartData={coreTempChartData} />
                    </Grid>
                    <Divider />
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacig={4}
                          sx={{ mt: 3}}>
                        <Divider>MEMORY USED (MB)</Divider>
                        <Chart id="coreTempChart" chartData={memoryChartData} />
                    </Grid>
                    <Divider />
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacig={4}
                          sx={{ mt: 3}}>
                        <Divider>SWAP MEMORY USED (MB)</Divider>
                        <Chart id="coreTempChart" chartData={swapChartData} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={4} sx={{ mt: 3 }}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.boardID} post={post}/>
                        ))}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}