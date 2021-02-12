import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../n2-features/f1-auth/a1-login/login-reducer'
import {AppRootStateType} from "../../m2-bll/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD} from "@fortawesome/free-brands-svg-icons"



export const Header = () => {
    const dispatch = useDispatch()
    const UserName = useSelector<AppRootStateType, string | null>(state => state.app.UserData.name)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    const logoutOnClick = () => {
        const thunk = logout()
        dispatch(thunk)
    }
    return (
        <div className={s.header}>
            <FontAwesomeIcon icon={faDAndD} size="4x" /> 
             <Nav/>

           
           <div className={s.burger}>
                <a href="" className={s.a} onClick={()=>{alert("menu open")}}>
                    <span className={s.burgerToggle}>
                        <span className={s.nk1}></span>
                        <span className={s.nk2}></span>
                        <span className={s.nk3}></span>
                    </span>
                </a>
            </div>
            {isLoggedIn && < SuperButton onClick={logoutOnClick} name="logout"/>}
            {isLoggedIn && <div style={{margin: "10px", color: "#e08821", fontWeight: "bold", fontSize: "20px"}}> {UserName} </div>}
                    </div>
    )
}


