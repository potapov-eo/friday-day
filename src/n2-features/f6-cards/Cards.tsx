import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {setAppErrorAC} from "../../n1-main/m2-bll/app-reduser";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import s from "../f5-packs/Packs.module.css";
import {CardType, getCardTC} from "./Cards-reducer";
import {Card} from "./card/Card";

export const Cards = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const {token} = useParams<{ token: string }>()
    useEffect(() => {
        if (token ) {
            dispatch(getCardTC(token))
        }
    }, [])
    if (!isLoggedIn) {
        dispatch(setAppErrorAC("you are not authorized"))
        return <Redirect to={PATH.LOGIN}/>
    }
    return (


        <div className={s.table}>
            <h1>Cards</h1>

            <div className={s.tableString}>
                <div>type</div>
                <div>question</div>
                <div>rating</div>

            </div>

            {cards.map(card =>
                <Card _id={card._id} user_id={card.user_id} type={card.type} question={card.question}
                      rating={card.rating}/>
            )}
        </div>
    )
}


