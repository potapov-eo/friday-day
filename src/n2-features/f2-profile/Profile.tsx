import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getMe, setIsLoggedIn} from "../f1-auth/a1-login/login-reducer";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {AppInitialStateType} from "../../n1-main/m2-bll/app-reduser";


export const Profile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
    },[])
    const isLoggedIn  = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userData  = useSelector<AppRootStateType,AppInitialStateType >(state => state.app)
    if (!isLoggedIn) {

        return <Redirect  to = {PATH.LOGIN}/>

    }

    return (

        <div className="App">
            <div>{`User Name : ${userData.name}`}</div>
            <div>{`User email : ${userData.email}`}</div>
            <div>{`User id : ${userData._id}`}</div>
            <div>{`public Card Packs Count : ${userData.publicCardPacksCount}`}</div>
            <div>{`avatar : ${userData.avatar}`}</div>

        </div>
    )
}