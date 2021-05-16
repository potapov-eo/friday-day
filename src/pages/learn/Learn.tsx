import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { CardType, setPaginationCardAC } from "../../store/cards-reduser/Cards-reducer";
import SuperButton from "../../components/SuperButton/SuperButton";
import s from './Learn.module.css'
import { PATH } from "../../routes/Routes";
import { selectorCards } from "../../store/cards-reduser/cardSelector";
import { selectorUserData } from "../../store/app-reduser/appSelector";
import { selectorIsLoggedIn } from "../../store/auth-reduser/authSelector";
import { getCardsAC, gradeCardAC } from "../../store/cards-reduser/cards-sagas";


type LearnPropsType = {}
export const Learn = (props: LearnPropsType) => {
    const dispatch = useDispatch()
    const { token } = useParams<{ token: string }>()
    const cards = useSelector(selectorCards)
    const UserData = useSelector(selectorUserData)
    const isLoggedIn = (selectorIsLoggedIn)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType | null>(null)


    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) ** 2;
                return { sum: newSum, id: newSum < rand ? i : acc.id }
            }
            , { sum: 0, id: -1 });

        return cards[res.id + 1];
    }

    const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

    useEffect(() => {
        if (first && token && isLoggedIn) {
            dispatch(setPaginationCardAC({ cardsPack_id: token }))
            dispatch(getCardsAC())
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, token, cards, first, isLoggedIn])

    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {

        }
    }
    const setGrade = (i: number) => {
        dispatch(gradeCardAC(i + 1, card ? card._id : ""))
        setCard(getCard(cards))
        setIsChecked(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        }

    }

    if (!UserData) {
        return <Redirect to={PATH.LOGIN}/>
    }                                            // при logOut с этой страницы перебрасывает на стр. Логин

    return (
        <div className={s.page}>
            <h1>LearnPage</h1>


            {token ? <div>
                <div className={s.card}>
                    <h2>QUESTION:</h2>
                    <div className={s.cardQuestion}>  {card ? card.question : ""}     </div>
                </div>
                <div>
                    <SuperButton name={"check"} onClick={() => setIsChecked(true)}/>
                </div>
            </div> : <><h3>"НЕОБХОДИМО ВЫБРАТЬ КОЛОДУ"</h3>
                <NavLink to={PATH.PACK} activeClassName={s.activeLink}>
                    < SuperButton name=">>> Packs"/>
                </NavLink> </>}

            {isChecked && (
                <>
                    <div className={s.card}>
                        <h2>ANSWER:</h2>
                        <div className={s.cardAnswer}>  {card ? card.answer : ""}</div>
                    </div>

                    {grades.map((g, i) => (
                        <SuperButton name={g} key={'grade-' + i} onClick={() => setGrade(i)}/>
                    ))}

                    <div><SuperButton name={"next"} onClick={onNext}/></div>
                </>
            )}
        </div>

    )
}
