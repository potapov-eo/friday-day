import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./AuthorizedNav.module.css"
import {PATH} from "../../routes/Routes";

type AuthorizedNavPropsType ={
    burgerNav?:boolean
}
export const    AuthorizedNav = (props:AuthorizedNavPropsType) => {

    return (
        <div className={props.burgerNav? s.burger:s.nav}>
            <span>
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
        </div>

    )
}