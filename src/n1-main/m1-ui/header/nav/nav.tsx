import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./nav.module.css"
import {PATH} from "../../routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import {logout} from "../../../../n2-features/f1-auth/auth-reducer";

export const Nav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData ? state.app.UserData.name : null)
    const logoutOnClick = () => {
        dispatch(logout())
    }
    return (

        <div className={s.nav}>


           {/* <span>
                <NavLink to={PATH.TEST} activeClassName={s.activeLink}>TEST</NavLink>
            </span>*/}
            {!isLoggedIn && <>
               <span>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>LOGIN</NavLink>
            </span>
                <span>
                <NavLink to={PATH.REGISTER} activeClassName={s.activeLink}>REGISTER</NavLink>
            </span>
                <span>
                <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={s.activeLink}>RECOVERY_PASSWORD</NavLink>
            </span>
                {/*<span>
                <NavLink to={PATH.NEW_PASSWORD} activeClassName={s.activeLink}>NEW_PASSWORD</NavLink>
            </span>*/}
            </>}
            {isLoggedIn && <> <span>
                <NavLink to={PATH.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
            </span>
                <span>
                <NavLink to={PATH.PACK} activeClassName={s.activeLink}>PACKS</NavLink>
            </span>
                <span>
                <NavLink to={PATH.CARDS} activeClassName={s.activeLink}>CARDS</NavLink>
            </span>
                <span>
                <NavLink to={PATH.LEARN} activeClassName={s.activeLink}>LEARN</NavLink>
            </span>
            <span> < SuperButton onClick={logoutOnClick} name="logout"/> </span>
            <span className={s.userName}> {UserName} </span>
            </>}
        </div>


    )
}