import React from 'react'
import { SortPackButton } from '../../../../n1-main/m1-ui/common/SortButtons/SortPackButton';
import SuperButton from "../../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import s from '../../Packs.module.css'

type HeadingsPropsType = {
    setActiveAddPackModal: (value: boolean) => void
}
export const Headings = (props: HeadingsPropsType) => {

    return (
        < >
            <div className={s.tableColumnTitle}>
                <h2> Name</h2>
                <SortPackButton param="name"/>
            </div>
            <div className={s.tableColumnTitle}>

                <h2> CardsCount</h2>
                <SortPackButton param="cardsCount"/>
            </div>
            <div className={s.tableColumnTitle}>
                <h2> Updated</h2>
                <SortPackButton param="updated"/>
            </div>
            <div><SuperButton onClick={() => {
                props.setActiveAddPackModal(true)
            }} name={"add"}/></div>
            <div className={s.tableColumnTitle}><h2>Update</h2></div>
            <div className={s.tableColumnTitle}><h2> Cards</h2></div>
            <div className={s.tableColumnTitle}><h2> Learn</h2></div>
        </>


    )
}
