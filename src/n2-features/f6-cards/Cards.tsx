import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {setAppErrorAC} from "../../n1-main/m2-bll/app-reduser";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import s from "../f5-packs/Packs.module.css";
import {CardType, getCardTC} from "./Cards-reducer";
import {Card} from "./card/Card";
import {PackType} from "../f5-packs/Packs-reduser";

export const Cards = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const pack= packs.find(p=>p._id===token)
    const createdUserId =pack? pack.user_id:""
    const isMyPack =( createdUserId === registerUserId)

    useEffect(() => {
        if (token) {
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
                <div>question</div>
                <div>answer</div>
                <div>grade</div>
                <div>updated</div>
                <div></div>
                <div><button disabled={isMyPack}>add</button></div>


            </div>

            {cards.map(card =>
                <Card card={card}/>
            )}
        </div>
    )
}


