import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../f1-auth/a1-login/login-reducer";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {UserDataType} from "../../n1-main/m2-bll/app-reduser";


export const Profile = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userData = useSelector<AppRootStateType, UserDataType>(state => state.app.UserData)
    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(getMe())
        }
    }, [isLoggedIn])

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>

    }

    return (

        <div className="App">
            PROFILE
            <div>{`User Name : ${userData.name}`}</div>
            <div>{`User email : ${userData.email}`}</div>
            <div>{`User id : ${userData._id}`}</div>
            <div>{`public Card Packs Count : ${userData.publicCardPacksCount}`}</div>
            <div>{`avatar : ${userData.avatar}`}</div>

        </div>
    )
}