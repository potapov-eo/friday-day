import React, { useEffect } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Preloader from "../components/Preloder/Preloader";
import { Routes } from "../routes/Routes";
import { Header } from "../components/header/Header";
import { setIsLoggedIn } from "../store/auth-reduser/auth-reducer";
import { ErrorSnackBar } from "../components/ErrorSnackBar/ErrorSnackBar";
import { selectorError, selectorStatus } from "../store/app-reduser/appSelector";
import { getMeACT } from "../store/auth-reduser/auth-sagas";


function App() {
    const dispatch = useDispatch()
    const status = useSelector(selectorStatus)
    const error = useSelector(selectorError)

    useEffect(() => {
        dispatch(setIsLoggedIn(false))
        dispatch(getMeACT())
    }, [])

    return (
        <div>
            <HashRouter>
                <Header/>
                {status === 'loading' && <Preloader/>}
                <Routes/>
                {error && <ErrorSnackBar errorMessage={error}/>}
            </HashRouter>
        </div>
    );
}

export default App;
