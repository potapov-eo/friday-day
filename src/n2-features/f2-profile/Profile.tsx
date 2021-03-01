import React from 'react'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {UserDataType} from "../../n1-main/m2-bll/app-reduser";
import s from "./Profile.module.css";


export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const userData = useSelector<AppRootStateType, UserDataType>(state => state.app.UserData)
    let {name, email, publicCardPacksCount} = userData ? userData : {name: "", email: "", publicCardPacksCount: ""}

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    const avatar = "https://www.meme-arsenal.com/memes/86d4e6cb230346eedca4b6c0d8970fef.jpg"
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