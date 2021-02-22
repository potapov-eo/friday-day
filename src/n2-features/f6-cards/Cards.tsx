import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../n1-main/m2-bll/app-reduser";
import {useParams} from "react-router-dom";
import s from "../f5-packs/Packs.module.css";
import {addCardTC, CardType, getCardTC, setCurrentIdAC, setCurrentPageAC} from "./Cards-reducer";
import {Card} from "./card/Card";
import {PackType} from "../f5-packs/Packs-reduser";
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {getCardsDataType} from "../../n1-main/m3-dal/instance";
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import { AddItemForm } from '../../n1-main/m1-ui/common/AddItemForm/AddItemForm'

export const Cards = () => {
    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false) 
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.page)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.pageCount)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.cards.totalCardsCount)

    const getCardsData = useSelector<AppRootStateType, getCardsDataType>(state => state.cards.paginationCards)


    const pack = packs.find(p => p._id === token)
    const createdUserId = pack ? pack.user_id : registerUserId
    const isMyPack = (createdUserId === registerUserId) && !(status === 'loading')


    useEffect(() => {
        if (token) {
            dispatch(setCurrentIdAC(token))
            dispatch(getCardTC())
        }
    }, [token])

    const addCard = () => {
        dispatch(addCardTC(token))
        setActiveAddCardModal(false)}

    const onPageChanged = (newNumber: number) => {
        dispatch(setCurrentPageAC(newNumber))
        dispatch(getCardTC())
    }


    return (

        <div className={s.table}>
            <h1>Cards</h1>
            <div>
                <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={3}
                           onPageChanged={onPageChanged}/>
            </div>
            {isLoggedIn ? <div className={s.tableString}>

                <div>question</div>
                <div>answer</div>
                <div>grade</div>
                <div>updated</div>
                <div>
                    <SuperButton onClick={()=>{setActiveAddCardModal(true)}}  disabled={!isMyPack} name={"add"}/>
                </div>

            </div> : <div>"you are not authorized"</div>}

            {cards.map(card =>
                <Card card={card}/>
            )}

            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal} >
                <AddItemForm addItem={addCard} buttonName={"add"} />
            </Modal>   
        </div>
    )
}


