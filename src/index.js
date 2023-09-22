import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import Header from "./layout/Heder";
import Footer from "./layout/Footer";
import TabBar from "./layout/TabBar";

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Header title="Blog" sections={sections}/>
        <App/>
        <Footer title="Footer" description="Something here to give the footer a purpose!"/>
        {!window.matchMedia("(min-width: 1024px)").matches && (
            <TabBar />
        )}
    </BrowserRouter>
);
