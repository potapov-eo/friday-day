import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {RequestStatusType} from "../../n1-main/m2-bll/app-reduser";
import {CardType, getCardTC, gradeCardTC, setCurrentIdAC} from "../f6-cards/Cards-reducer";
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";


type LearnPropsType = {}
export const Learn = (props: LearnPropsType) => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType | null>(null)

    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }
    const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

    useEffect(() => {
        if (first && token) {
            dispatch(setCurrentIdAC(token))
            dispatch(getCardTC())
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, token, cards, first])

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    const setGrade = (i: number) => {
debugger
        dispatch(gradeCardTC(i + 1, card ? card._id : ""))
        setCard(getCard(cards))
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        }

    }

    return (
        <div>
            LearnPage

            {token ? <div>
                <div>QUESTION: {card ? card.question : ""}</div>
                <div>
                    <SuperButton name={"check"} onClick={() => setIsChecked(true)}/>
                </div>
            </div> : <div>"НЕОБХОДИМО ВЫБРАТЬ КОЛОДУ"</div>}

            {isChecked && (
                <>
                    <div> ANSWER: {card ? card.answer : ""}</div>

                    {grades.map((g, i) => (
                        <SuperButton name={g} key={'grade-' + i} onClick={() => setGrade(i)}/>
                    ))}

                    <div><SuperButton name={"next"} onClick={onNext}/></div>
                </>
            )}
        </div>

    )
}
