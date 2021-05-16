import React, { useState } from 'react'
import s from '../../pages/packs/Packs.module.css'
import SuperButton from "../SuperButton/SuperButton";
import { useDispatch } from "react-redux";
import { PackType } from "../../store/packs-reduser/Packs-reduser";
import { BooleanForm } from "../modal/BooleanModal/BooleanForm";
import { AddForm } from "../modal/AddForm/AddForm";
import { ActiveColumnPack } from "./activeColumnPack/activeColumnPack";
import { Modal } from "../modal/Modal";
import { removePackAC, updatePackNameAC } from "../../store/packs-reduser/packs-sagas";


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
    const { _id, name, cardsCount, updated } = props.pack


    const deletePack = (isDel: boolean) => {
        setActiveDelPackModal(false)
        isDel && dispatch(removePackAC(_id))
    }

    const updatePack = async (newNamePack: string) => {
        await dispatch(updatePackNameAC(_id, newNamePack))
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
