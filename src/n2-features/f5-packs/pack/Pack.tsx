import React, {useState} from 'react'
import s from '../Packs.module.css'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import { removePackTC, updateTC} from "../Packs-reduser";
import {RequestStatusType} from "../../../n1-main/m2-bll/app-reduser";
import {Modal} from '../../..//n1-main/m1-ui/common/Modal/Modal'
import { AddItemForm } from '../../../n1-main/m1-ui/common/AddItemForm/AddItemForm'


type packPropsType = {
    name: string
    cardsCount?: number
    updated?: string
    pack_id: string
    userId: string
    activeModal:boolean
    setActiveModal:(activeModal:boolean)=> void
}
export const Pack = (props: packPropsType) => {
    const [activeUpdatePackModal, setActiveUpdatePackModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isMyPack = (props.userId === registerUserId) && !(status === 'loading')
    const del = () => {
        dispatch(removePackTC(props.pack_id))
    }

    const updatePack = (newNamePack: string) => {
        dispatch(updateTC(props.pack_id, newNamePack))
        setActiveUpdatePackModal(false)
    }

    return (
        <div>
            <div className={s.tableString} key={props.pack_id}>
                <div>{props.name}</div>
                <div>{props.cardsCount}</div>
                <div>{props.updated}</div>
                <div><SuperButton disabled={!isMyPack} name={"del"} onClick={del} /></div>
                <div><SuperButton disabled={!isMyPack} name={"update"} onClick={() => { setActiveUpdatePackModal(true) }} /></div>
                <div><NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink></div>
                <div><NavLink to={`${PATH.LEARN}/${props.pack_id}`} activeClassName={s.activeLink}>Learn</NavLink></div>
            </div>

            <Modal activeModal={activeUpdatePackModal} setActiveModal={setActiveUpdatePackModal} >
                <AddItemForm addItem={updatePack} buttonName={"update"}/>
            </Modal>
        </div>



    )
}
