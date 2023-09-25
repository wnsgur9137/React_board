import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const ChartMock = ({ chartData }) => {
    let min = 100
    let max = 0
    chartData['datasets'].forEach((dataset) => {
        dataset['data'].forEach((data) => {
            if (min > parseInt(data)) {
                min = data
            }
            if (max < parseInt(data)) {
                max = data
            }
        })
    })
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                min: parseInt(min <= 20 ? 0 : min - 3),
                max: parseInt(max + 3),
                stepSize: 10,
            },
            y1: {
                position: 'right',
                beginAtZero: true,
            },
        },
    }
    return (
        <Container>
            <Line type="line" data={chartData} options={options} height={150}/>
        </Container>
    );
};

export default ChartMock;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
  height: 50vw;
`;