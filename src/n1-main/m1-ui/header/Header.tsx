import React from 'react'
import s from "./Header.module.css"
import {Nav} from "./nav/nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDAndD} from "@fortawesome/free-brands-svg-icons"
import {BurgerNav} from "./burgerNav/burgerNav";


export const Header = () => {

    return (
        <div className={s.header}>

            <FontAwesomeIcon icon={faDAndD} size="4x"/>
            <Nav/>
            <BurgerNav/>
        </div>
    )
}


