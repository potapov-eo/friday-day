import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";

export const Header = () => {
    return (
        <div className={s.header}>
            <Nav/>
        </div>
    )
}