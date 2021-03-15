import React, {useState} from 'react'
import s from '../../Packs.module.css'

import {useDispatch, useSelector} from "react-redux";

import {NavLink} from "react-router-dom";
import {PackType, removePackTC, updateTC} from "../../Packs-reduser";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../../../n1-main/m2-bll/app-reduser";
import SuperButton from "../../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {PATH} from "../../../../n1-main/m1-ui/routes/Routes";



type ActiveColumnPackType = {
    pack: PackType
    setActiveDelPackModal: (activeModal: boolean) => void
    setActiveUpdatePackModal:(activeModal: boolean) => void
}
export const ActiveColumnPack = (props: ActiveColumnPackType) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const {user_id, _id} = props.pack
    const isMyPack = (user_id === registerUserId) && !(status === 'loading')

    return (

            <div className={s.tableString} >
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
