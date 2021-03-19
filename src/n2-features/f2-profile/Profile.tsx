import React from 'react'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import s from "./Profile.module.css";
import {selectorIsLoggedIn} from "../f1-auth/authSelector";
import {selectorUserData} from "../../n1-main/m2-bll/appSelector";


export const Profile = () => {

    const isLoggedIn = useSelector(selectorIsLoggedIn)
    const userData = useSelector(selectorUserData)
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