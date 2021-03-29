import React from 'react'
import s from '../../Packs.module.css'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {PackType} from "../../Packs-reduser";
import SuperButton from "../../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {PATH} from "../../../../n1-main/m1-ui/routes/Routes";
import {selectorStatus, selectorUserId} from "../../../../n1-main/m2-bll/appSelector";


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
