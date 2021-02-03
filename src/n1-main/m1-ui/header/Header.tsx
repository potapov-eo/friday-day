import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./Header.module.css"
import {PATH} from "../routes/Routes";

export const Header = () => {
    return (
        <div className="App">
            <div>
                <NavLink to={PATH.HOME} activeClassName={s.activeLink}>HOME</NavLink>
            </div>
            <div>
                <NavLink to={PATH.TEST} activeClassName={s.activeLink}>TEST</NavLink>
            </div>
            <div>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>LOGIN</NavLink>
            </div>
            <div>
                <NavLink to={PATH.REGISTER} activeClassName={s.activeLink}>REGISTER</NavLink>
            </div>
            <div>
                <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={s.activeLink}>RECOVERY_PASSWORD</NavLink>
            </div>
            <div>
                <NavLink to={PATH.NEW_PASSWORD} activeClassName={s.activeLink}>NEW_PASSWORD</NavLink>
            </div>
            <div>
                <NavLink to={PATH.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
            </div>


        </div>
    )
}