import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Header} from "./header/Header";
import {Routes} from "./routes/Routes";
import {Provider} from 'react-redux';
import {store, AppRootStateType} from "../m2-bll/store";
import {useSelector, useDispatch} from "react-redux";
import {getMe} from '../../n2-features/f1-auth/a1-login/login-reducer'
import Preloader from './common/Preloder/Preloader';


function App() {
    return (
        <div >
            <Provider store={store}>
                <HashRouter>

                    <Header/>

                    <Routes/>

                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;
