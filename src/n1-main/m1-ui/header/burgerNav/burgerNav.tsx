import React, {useState} from 'react'
import s from "./burgerNav.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import {logout} from "../../../../n2-features/f1-auth/auth-reducer";
import {AuthorizedNav} from "../authorizedNav/AuthorizedNav";
import {NotAuthorizedNav} from "../authorizedNav/NotAuthorizedNav";
import {RequestStatusType} from "../../../m2-bll/app-reduser";


export const BurgerNav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoading = status === 'loading'
    const logoutOnClick = () => {
        dispatch(logout())
    }
    let [menuIsOpen, setMenuIsOpen] = useState(false)
    const setMenu = () => setMenuIsOpen(!menuIsOpen)
    const btnName = menuIsOpen ? "Close" : "Menu"

    return ( <div  className={s.burgerNav}>
       {isLoggedIn &&
            < SuperButton disabled={isLoading} onClick={logoutOnClick} name="logout"/>
            }

            {menuIsOpen && <div className={s.nav}>
                {!isLoggedIn && <NotAuthorizedNav burgerNav={true}/>}
                {isLoggedIn && <AuthorizedNav burgerNav={true}/>}
            </div>}

            <div className={s.positionBtn}>
                <SuperButton  name={btnName} onClick={setMenu}/>
            </div>
        </div>
    )
}