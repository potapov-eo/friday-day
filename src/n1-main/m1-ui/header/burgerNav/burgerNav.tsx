import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import s from "./burgerNav.module.css"
import {PATH} from "../../routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import SuperButton from "../../common/SuperButton/SuperButton";
import {logout} from "../../../../n2-features/f1-auth/auth-reducer";
// @ts-ignore
import Fade from 'react-reveal/Fade';


export const BurgerNav = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData ? state.app.UserData.name : null)
    const logoutOnClick = () => {
        dispatch(logout())
    }
    let [menuIsOpen, setMenuIsOpen] = useState(false)
    const setMenu = () => setMenuIsOpen(!menuIsOpen)
    const btnName = menuIsOpen ? "Close" : "Menu"

    return (<>
            {isLoggedIn &&
                < SuperButton className={s.logOutBtns} onClick={logoutOnClick} name="logout"/>
                }
            {menuIsOpen && <div className={s.nav}>

                {!isLoggedIn && <div className={s.logOutBtn}>
               <span>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>LOGIN</NavLink>
            </span>
                    <span>
                <NavLink to={PATH.REGISTER} activeClassName={s.activeLink}>REGISTER</NavLink>
            </span>
                </div>}


                {isLoggedIn && <Fade left>
                    <div className={s.logOutBtn}> <span>
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
                </Fade>}

            </div>}

            <div className={s.burgerMenu} onClick={setMenu}>{btnName}</div>

        </>
    )
}