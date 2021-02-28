import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType, UserDataType} from "../../n1-main/m2-bll/app-reduser";
import {NavLink, Redirect, useParams} from "react-router-dom";
import s from "../f5-packs/Packs.module.css";
import {addCardTC, CardType, getCardTC, setPaginationCardAC} from "./Cards-reducer";
import {Card} from "./card/Card";
import {PackType} from "../f5-packs/Packs-reduser";
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {AddCardForm, valueType} from "../../n1-main/m1-ui/common/AddCardForm/AddCardForm";
import {CardsHeadings} from "./cardsHeading/CardsHeadings";


export const Cards = () => {
    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.page)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cards.paginationCards.pageCount)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.cards.totalCardsCount)
    const pack = packs.find(p => p._id === token)
    const createdUserId = pack ? pack.user_id : registerUserId
    const isMyPack = (createdUserId === registerUserId) && !(status === 'loading')
    const UserData = useSelector<AppRootStateType, UserDataType | null>(state => state.app.UserData)

    useEffect(() => {
        if (isLoggedIn && token) {
            dispatch(setPaginationCardAC({cardsPack_id: token}))
            dispatch(getCardTC())
        }
    }, [isLoggedIn, token])

    const addCard = (value: valueType) => {
        dispatch(addCardTC(token, value))
        setActiveAddCardModal(false)
    }

    const onPageChanged = (newNumber: number) => {
        dispatch(setPaginationCardAC({page: newNumber}))
        dispatch(getCardTC())
    }
    if (!UserData) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <div className={s.table}>
            <h1>Cards</h1>
            {token && (cards.length > 0) &&
            <h2><NavLink to={`${PATH.LEARN}/${token}`} activeClassName={s.activeLink}>Learn</NavLink></h2>}
            <div>
                {token && (cards.length > 0) &&
                <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={3}
                           onPageChanged={onPageChanged}/>}
            </div>
            {token ? <div className={s.tableString}>
                <CardsHeadings setActiveAddCardModal={setActiveAddCardModal}
                               isMyPack={isMyPack}/>

            </div> : <h3>"НЕОБХОДИМО ВЫБРАТЬ КОЛОДУ"</h3>}

            {token ? cards.map(card =>
                <Card key={card._id} card={card}/>
            ) : <div></div>}

            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal}>
                <AddCardForm addCard={addCard} text={"Enter question and answer of new card"}/>
            </Modal>
        </div>
    )
}


