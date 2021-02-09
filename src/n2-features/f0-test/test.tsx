import React, {useEffect} from 'react'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../n1-main/m1-ui/common/SuperInput/SuperInput";
import {Error404} from "../f4-404/Error404";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {getMe} from "../f1-auth/a1-login/login-reducer";


export const Test = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(getMe())
        }
    }, [isLoggedIn])

    return (
        <div className="App">
            <SuperButton/>
            <SuperButton name={"xxx"}/>
            <SuperInput type="text"/>
            <Error404/>
        </div>
    )
}