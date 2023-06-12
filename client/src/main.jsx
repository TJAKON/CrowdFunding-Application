import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import {ThirdwebProvider, ChainId} from '@thirdweb-dev/react'

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ThirdwebProvider activeChain = {ChainId.Goerli}>
        <Router>
            <React.StrictMode>
                <StateContextProvider>
                    <App />
                </StateContextProvider>
            </React.StrictMode>
        </Router>
    </ThirdwebProvider>
)