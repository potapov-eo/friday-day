import React, {useState} from 'react'
import s from '../Packs.module.css'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {PackType, removePackTC, updateTC} from "../Packs-reduser";
import {Modal} from '../../..//n1-main/m1-ui/common/Modal/Modal'
import {BooleanForm} from "../../../n1-main/m1-ui/common/Modal/BooleanModal/BooleanForm";
import {AddForm} from "../../../n1-main/m1-ui/common/Modal/AddForm/AddForm";
import {ActiveColumnPack} from "./activeColumnPack/activeColumnPack";


type packPropsType = {
    pack: PackType
    activeModal: boolean
    setActiveModal: (activeModal: boolean) => void
}
export const Pack = (props: packPropsType) => {
    const dispatch = useDispatch()
    const [activeDelPackModal, setActiveDelPackModal] = useState<boolean>(false)
    const [activeUpdatePackModal, setActiveUpdatePackModal] = useState<boolean>(false)
    const [isActiveColumnPack, setIsActiveColumnPack] = useState<boolean>(false)
    const {_id, name, cardsCount, updated} = props.pack


    const deletePack = (isDel: boolean) => {
        setActiveDelPackModal(false)
        isDel && dispatch(removePackTC(_id))
    }

    const updatePack = (newNamePack: string) => {
        dispatch(updateTC(_id, newNamePack))
        setActiveUpdatePackModal(false)
    }
    const showActiveColumnPack = () => {
        setIsActiveColumnPack(!isActiveColumnPack)
    }
    const nameBtn = isActiveColumnPack ? "<<<" : ">>>"
    return (
        <div>
            <div className={s.tableString}>

                <div>{name} </div>
                <div>{cardsCount}</div>
                <div>{updated ? updated.slice(0, 10) : ""}</div>
                <span className={s.ActiveColumnPack}>
                <ActiveColumnPack pack={props.pack}
                                  setActiveDelPackModal={setActiveDelPackModal}
                                  setActiveUpdatePackModal={setActiveUpdatePackModal}/></span>

                <div className={s.ActiveColumnPack3}><SuperButton onClick={() => showActiveColumnPack()}
                                                                  name={nameBtn}/></div>

            </div>

            <span className={s.ActiveColumnPack2}>
                {isActiveColumnPack && <ActiveColumnPack pack={props.pack}
                                                         setActiveDelPackModal={setActiveDelPackModal}
                                                         setActiveUpdatePackModal={setActiveUpdatePackModal}/>}
            </span>


            <Modal activeModal={activeUpdatePackModal} setActiveModal={setActiveUpdatePackModal}>
                <AddForm addItem={updatePack} buttonName={"update"} itemName={"new name"} text={"Enter new name"}/>
            </Modal>
            <Modal activeModal={activeDelPackModal} setActiveModal={setActiveDelPackModal}>
                <BooleanForm question={`you want to remove the pack with the name: "${name}". Are you sure`}
                             push={deletePack}/>
            </Modal>
        </div>


    )
}
