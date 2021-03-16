import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType, UserDataType} from "../../n1-main/m2-bll/app-reduser";
import {NavLink, Redirect, useParams} from "react-router-dom";
import s from "../f5-packs/Packs.module.css";
import {addCardTC, CardType, getCardTC, paginationCardsType, setPaginationCardAC} from "./Cards-reducer";
import {Card} from "./card/Card";
import {PackType} from "../f5-packs/Packs-reduser";
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {AddCardForm, valueType} from "../../n1-main/m1-ui/common/Modal/AddCardForm/AddCardForm";
import {CardsHeadings} from "./cardsHeading/CardsHeadings";


export const Cards = () => {

    const dispatch = useDispatch()

    const UserData = useSelector<AppRootStateType, UserDataType | null>(state => state.app.UserData)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const {paginationCards, totalCardsCount, cards} = useSelector<AppRootStateType,
        { paginationCards: paginationCardsType, totalCardsCount: number, cards: Array<CardType> }>(state => state.cards)
    const {page, pageCount} = paginationCards

    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false)

    const {token} = useParams<{ token: string }>()

    const pack = packs.find(p => p._id === token)
    const createdUserId = pack ? pack.user_id : registerUserId
    const isMyPack = (createdUserId === registerUserId) && !(status === 'loading')


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

            {token ? <div className={s.tableString}>
                {isLoggedIn ? <CardsHeadings setActiveAddCardModal={setActiveAddCardModal}
                               isMyPack={isMyPack}/>:<>
                    <div className={s.notAuthorized}>"you are not authorized"</div>
                    <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>{"LOGIN >>> "}</NavLink>
                </>}

            </div> : <h3>"НЕОБХОДИМО ВЫБРАТЬ КОЛОДУ"</h3>}

            {token ? cards.map(card =>
                <Card key={card._id} card={card}/>
            ) : <div></div>}

            <div>
                {token && (cards.length > 0) &&
                <Paginator currentPage={page} pageSize={pageCount} totalItemsCount={totalCardsCount} portionSize={3}
                           onPageChanged={onPageChanged}/>}
            </div>

            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal}>
                <AddCardForm addCard={addCard} text={"Enter question and answer of new card"}/>
            </Modal>
        </div>
    )
}


