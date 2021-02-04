import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Header} from "./header/Header";
import {Routes} from "./routes/Routes";
import {Provider} from 'react-redux';
import {store} from "../m2-bll/store";

function App() {
    return (
        <div className="App">
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
