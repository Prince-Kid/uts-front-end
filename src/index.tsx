import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import AuthProvider from "react-auth-kit/AuthProvider"
import { store } from './Redux/store';
import authStore from "./Lib/AuthKitStore"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
    <Provider store={store}>
        <AuthProvider store={authStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
    </Provider>
    ,
    document.getElementById('root'));
