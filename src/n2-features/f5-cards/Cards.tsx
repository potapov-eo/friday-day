import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {PackType, getCardPacksTC} from '../../n2-features/f5-cards/cards-reduser'
import s from './Cards.module.css'

export const Cards = () => {   
    const cards = useSelector<AppRootStateType, Array<PackType>>(state => state.cards.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])  
    return (
        
        <div className={s.table}>
            <h1>Cards</h1>
            {cards.map(card =>
                <div className={s.tableString} key={card._id}>
                    <div>{card.name}</div>
                    <div>{card.user_name}</div>
                    <div>{card.cardsCount}</div>
                    <div>{card.shots}</div>
                    <div>{card.grade}</div>
                    <div>{card.rating}</div>
                    <div>{card.type}</div>
                    <div>{card.created}</div>
                    <div>{card.updated}</div>
                </div>

            )}
        </div>
    )
}


