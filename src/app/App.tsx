import React, {useEffect, useState} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../store/store";
import {RequestStatusType} from "../store/app-reduser/app-reduser";
import Preloader from "../components/Preloder/Preloader";
import {Routes} from "../routes/Routes";
import {Header} from "../components/header/Header";
import {getMe, setIsLoggedIn} from "../store/auth-reduser/auth-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";


function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    let [firstRendering, setFirstRendering] = useState<boolean>(true)

    useEffect(() => {
        if (firstRendering) {
            dispatch(setIsLoggedIn(false))
            dispatch(getMe())

        }
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