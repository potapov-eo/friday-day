import React from 'react'
import s from "./nav.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import {logout} from "../../../../n2-features/f1-auth/auth-reducer";
import {NotAuthorizedNav} from "../authorizedNav/NotAuthorizedNav";
import {AuthorizedNav} from "../authorizedNav/AuthorizedNav";

export const Nav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData ? state.app.UserData.name : null)
    const logoutOnClick = () => {
        dispatch(logout())
    }
    return (

        <div className={s.nav}>

            {!isLoggedIn && <NotAuthorizedNav/>}
            {isLoggedIn && <> <AuthorizedNav/>
                <span> < SuperButton onClick={logoutOnClick} name="Logout"/> </span>
                <span className={s.userName}> {UserName} </span>
            </>}
        </div>


    )
}