import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const ChartMock = ({ chartData }) => {
    return (
        <Container>
            <Line type="line" data={chartData} />
        </Container>
    );
};

export default ChartMock;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;