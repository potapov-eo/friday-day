import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Header} from "./header/Header";
import {Routes} from "./routes/Routes";

function App() {
    return (
        <div className="App">

            <HashRouter>

                <Header/>

                <Routes/>

            </HashRouter>

        </div>
    );
}

export default App;
