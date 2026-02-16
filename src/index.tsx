/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router} from 'react-router-dom';

const Router2 = Router as any;

ReactDOM.render(
    <React.StrictMode>
        <Router2>
            <App/>
        </Router2>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
