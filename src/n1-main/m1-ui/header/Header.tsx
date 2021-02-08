import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../n2-features/f1-auth/a1-login/login-reducer'

export const Header = () => {
    const dispatch = useDispatch()

    const logoutOnClick = () => {
        const thunk = logout()
        dispatch(thunk)
    }
    return (
        <div className={s.header}>
            <Nav/> 
            <SuperButton onClick = {logoutOnClick} name="logout"/>
        </div>
    )
}