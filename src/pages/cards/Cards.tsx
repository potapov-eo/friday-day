import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, useParams} from "react-router-dom";
import s from "../packs/Packs.module.css";
import {addCardTC, getCardTC, setPaginationCardAC} from "../../store/cards-reduser/Cards-reducer";
import {Card} from "../../components/card/Card";
import {Paginator} from "../../components/Paginator/Paginator";
import {Modal} from '../../components/modal/Modal'
import {PATH} from "../../routes/Routes";
import {AddCardForm, valueType} from "../../components/modal/AddCardForm/AddCardForm";
import {CardsHeadings} from "../../components/card/cardsHeading/CardsHeadings";
import SuperButton from "../../components/SuperButton/SuperButton";
import {selectorStatus, selectorUserData, selectorUserId} from "../../store/app-reduser/appSelector";
import {selectorIsLoggedIn} from "../../store/auth-reduser/authSelector";
import {selectorCardPacks} from "../../store/packs-reduser/packSelector";
import {selectorCards, selectorPaginationCards, selectorTotalCardsCount} from "../../store/cards-reduser/cardSelector";


export const Cards = () => {

    const dispatch = useDispatch()

    const UserData = useSelector(selectorUserData)
    const status = useSelector(selectorStatus)
    const registerUserId = useSelector(selectorUserId)
    const isLoggedIn = useSelector(selectorIsLoggedIn)
    const packs = useSelector(selectorCardPacks)
    const paginationCards = useSelector(selectorPaginationCards)
    const totalCardsCount = useSelector(selectorTotalCardsCount)
    const cards = useSelector(selectorCards)
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
    }, [isLoggedIn, token, dispatch])

    const addCard = async (value: valueType) => {
        await dispatch(addCardTC(token, value))
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
                                             isMyPack={isMyPack}/> : <>
                    <div className={s.notAuthorized}>"you are not authorized"</div>
                    <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>{"LOGIN >>> "}</NavLink>
                </>}

            </div> : <><h3>"НЕОБХОДИМО ВЫБРАТЬ КОЛОДУ"</h3>
                <NavLink to={PATH.PACK} activeClassName={s.activeLink}>
                    < SuperButton name=">>> Packs"/>
                </NavLink>  </>}

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


