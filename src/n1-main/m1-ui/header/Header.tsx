import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../n2-features/f1-auth/a1-login/login-reducer'
import {AppRootStateType} from "../../m2-bll/store";

export const Header = () => {
    const dispatch = useDispatch()
    const UserName = useSelector<AppRootStateType, string | null>(state =>state.app.UserData? state.app.UserData.name: null)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    const logoutOnClick = () => {
        const thunk = logout()
        dispatch(thunk)
    }
    return (
        <div className={s.header}>
            <Nav/>
            {isLoggedIn && < SuperButton onClick={logoutOnClick} name="logout"/>}
            {isLoggedIn && <div style={{margin: "10px", color: "red"}}> YOUR NAME : {UserName} </div>}
        </div>
    )
}