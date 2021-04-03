import React from 'react'
import s from '../../../pages/packs/Packs.module.css'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {PackType} from "../../../store/packs-reduser/Packs-reduser";
import SuperButton from "../../SuperButton/SuperButton";
import {PATH} from "../../../routes/Routes";
import {selectorStatus, selectorUserId} from "../../../store/app-reduser/appSelector";


type ActiveColumnPackType = {
    pack: PackType
    setActiveDelPackModal: (activeModal: boolean) => void
    setActiveUpdatePackModal: (activeModal: boolean) => void
}


export const ActiveColumnPack = (props: ActiveColumnPackType) => {

    const status = useSelector(selectorStatus)
    const registerUserId = useSelector(selectorUserId)
    const {user_id, _id} = props.pack
    const isMyPack = (user_id === registerUserId) && !(status === 'loading')

    return (

        <div className={s.tableString}>
            <div><SuperButton disabled={!isMyPack} onClick={() => {
                props.setActiveDelPackModal(true)
            }} name={"del"}/></div>
            <div><SuperButton disabled={!isMyPack} name={"update"} onClick={() => {
                props.setActiveUpdatePackModal(true)
            }}/></div>
            <div><NavLink to={`${PATH.CARDS}/${_id}`} activeClassName={s.activeLink}>CARDS</NavLink></div>
            <div><NavLink to={`${PATH.LEARN}/${_id}`} activeClassName={s.activeLink}>Learn</NavLink></div>
        </div>


    )
}
