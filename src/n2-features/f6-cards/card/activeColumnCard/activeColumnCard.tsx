import React from 'react'
import s from '../../../f5-packs/Packs.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../../../n1-main/m2-bll/app-reduser";
import SuperButton from "../../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {CardType} from "../../Cards-reducer";


type ActiveColumnCardType = {
    card: CardType
    setActiveDelCardModal: (activeModal: boolean) => void
    setActiveAddCardModal: (activeModal: boolean) => void
    additionalColumn?: boolean
}
export const ActiveColumnCard = (props: ActiveColumnCardType) => {

    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isMyPack = (props.card.user_id === registerUserId) && !(status === 'loading')

    return (
        <div className={s.tableString}>
            {props.additionalColumn && <div className={s.tableColumnTitle}>
                <h2>updated</h2>
            </div>}
            <div>{props.card.updated.slice(0, 10)}</div>
            <div><SuperButton disabled={!isMyPack} onClick={() => {
                props.setActiveDelCardModal(true)
            }} name={"del"}/></div>

            <div>
                <SuperButton disabled={!isMyPack} onClick={() => props.setActiveAddCardModal(true)} name={"update"}/>
            </div>

        </div>
    )
}
