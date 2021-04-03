import React, {useState} from 'react'
import s from '../../pages/packs/Packs.module.css'
import {useDispatch} from "react-redux";
import {CardType, removeCardTC, updateCardTC} from "../../store/cards-reduser/Cards-reducer";
import SuperButton from "../SuperButton/SuperButton";
import {Modal} from "../modal/Modal";
import {BooleanForm} from "../modal/BooleanModal/BooleanForm";
import {AddCardForm, valueType} from "../modal/AddCardForm/AddCardForm";
import {ActiveColumnCard} from "./activeColumnCard/activeColumnCard";

type cardPropsType = {
    card: CardType
}
export const Card = (props: cardPropsType) => {
    const card = props.card
    const dispatch = useDispatch()
    const [isActiveColumnPack, setIsActiveColumnPack] = useState<boolean>(false)
    const [activeAddCardModal, setActiveAddCardModal] = useState<boolean>(false)
    const [activeDelPackModal, setActiveDelCardModal] = useState<boolean>(false)

    const removeCard = (isDel: boolean) => {
        setActiveDelCardModal(false)
        isDel && dispatch(removeCardTC(card.cardsPack_id, card._id))
    }
    const updatedCard = (value: valueType) => {
        setActiveAddCardModal(false)
        dispatch(updateCardTC(card._id, value))
    }
    const showActiveColumnPack = () => {
        setIsActiveColumnPack(!isActiveColumnPack)
    }
    const nameBtn = isActiveColumnPack ? "<<<" : ">>>"
    return (
        <div>
            <div className={s.tableString}>
                <div>{card.question}</div>
                <div>{card.answer}</div>
                <div>{card.grade}</div>

                <div className={s.ActiveColumnPack3}><SuperButton onClick={() => showActiveColumnPack()}
                                                                  name={nameBtn}/></div>
                <span className={s.ActiveColumnPack}>
                    <ActiveColumnCard card={card} setActiveAddCardModal={setActiveAddCardModal}
                                      setActiveDelCardModal={setActiveDelCardModal}/>

           </span>
            </div>

            <span className={s.ActiveColumnPack2}>
                {isActiveColumnPack && <ActiveColumnCard card={card} setActiveAddCardModal={setActiveAddCardModal}
                                                         setActiveDelCardModal={setActiveDelCardModal}
                                                         additionalColumn={true}
                />}
            </span>


            <Modal activeModal={activeDelPackModal} setActiveModal={setActiveDelCardModal}>
                <BooleanForm question={`you want to remove the card with the question: "${card.question}"`}
                             push={removeCard}/>
            </Modal>
            <Modal activeModal={activeAddCardModal} setActiveModal={setActiveAddCardModal}>
                <AddCardForm addCard={updatedCard} text={"Enter new question and new answer"}/>
            </Modal>
        </div>
    )
}
