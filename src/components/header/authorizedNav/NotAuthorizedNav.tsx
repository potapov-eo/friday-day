import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./AuthorizedNav.module.css"
import {PATH} from "../../../routes/Routes";

type AuthorizedNavPropsType = {
    burgerNav?: boolean
}
export const NotAuthorizedNav = (props: AuthorizedNavPropsType) => {

    return (
        <div className={props.burgerNav ? s.burger : s.NANav}>
           <span>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>LOGIN</NavLink>
            </span>
            <span>
                <NavLink to={PATH.REGISTER} activeClassName={s.activeLink}>REGISTER</NavLink>
            </span>
        </div>

    )
}