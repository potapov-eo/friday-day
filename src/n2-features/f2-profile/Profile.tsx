import React from 'react'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {UserDataType} from "../../n1-main/m2-bll/app-reduser";
import s from "./Profile.module.css";


export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userData = useSelector<AppRootStateType, UserDataType>(state => state.app.UserData)
    let {name, email, publicCardPacksCount} = userData ? userData : {name: "", email: "", publicCardPacksCount: ""}

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const avatar = "https://www.gravatar.com/avatar/c37e0453882ec1e1d40bb4387e27b1dc?s=200&r=g&d=mm"
    return (

        <div className={s.profile}>
            <h1>PROFILE</h1>
            <div className={s.profileContainer}>
                <img className={s.avatar} src={avatar}/>
                {/* {userData.avatar} */}
                <div className={s.info}>
                    <div> Name: <span>{name}</span></div>
                    <div> Email: <span>{email}</span></div>
                    <div>Public Card Packs Count: <span>{publicCardPacksCount}</span></div>
                </div>
            </div>
        </div>
    )
}