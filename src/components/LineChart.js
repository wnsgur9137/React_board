import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const data = {
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
            backgroundColor: 'r' +
                'gb(255, 99, 132)',
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

const ChartMock = (chartData) => {
    console.log("00000000");
    console.log(chartData);
    console.log("00000000");
    return (
        <Container>
            <Line type="line" data={data} />
            {/*<Chart data={chartData} />*/}
        </Container>
    );
};

export default ChartMock;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;