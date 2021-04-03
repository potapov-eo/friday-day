import React from 'react'

import s from '../../pack/headings/Headings.module.css'
import {SortCardButton} from "../../SortButtons/SortCardButton";
import SuperButton from "../../SuperButton/SuperButton";

type CardsHeadingsPropsType = {
    setActiveAddCardModal: (value: boolean) => void
    isMyPack: boolean
}
export const CardsHeadings = (props: CardsHeadingsPropsType) => {

    return (
        < >
            <div className={s.tableColumnTitle}>
                <h2>question</h2>
                <SortCardButton param="question"/>
            </div>

            <div className={s.tableColumnTitle}>
                <h2>answer</h2>
                <SortCardButton param="answer"/>
            </div>

            <div className={s.tableColumnTitle}>
                <h2>grade</h2>
                <SortCardButton param="grade"/>
            </div>

            <div className={s.tableColumnTitleHide}>
                <h2>updated</h2>
            </div>

            <div>
                <SuperButton onClick={() => {
                    props.setActiveAddCardModal(true)
                }} disabled={!props.isMyPack} name={"add"}/>
            </div>
            <div className={s.tableColumnTitleHide}></div>
        </>


    )
}
