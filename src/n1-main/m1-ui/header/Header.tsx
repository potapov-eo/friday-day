import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../../m2-bll/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDAndD} from "@fortawesome/free-brands-svg-icons"
import {logout} from "../../../n2-features/f1-auth/auth-reducer";


export const Header = () => {
    const dispatch = useDispatch()
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData ? state.app.UserData.name : null)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logoutOnClick = () => {
        dispatch(logout())
    }

    return (
        <div className={s.header}>

            <FontAwesomeIcon icon={faDAndD} size="4x"/>
            <Nav/>

            {isLoggedIn && < SuperButton onClick={logoutOnClick} name="logout"/>}
            {isLoggedIn &&
            <div className={s.userName}> {UserName} </div>}
        </div>
    )
}


