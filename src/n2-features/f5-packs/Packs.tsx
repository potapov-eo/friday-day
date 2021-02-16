import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {PackType, getCardPacksTC, addCardPacksTC, setPaginationAC} from './/Packs-reduser'
import s from './Packs.module.css'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Pack} from "./pack/Pack";
import {setAppErrorAC} from "../../n1-main/m2-bll/app-reduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";

export const Packs = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userId = useSelector<AppRootStateType, string>(state =>state.app.UserData? state.app.UserData._id:"")
    const cardPacks = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const [x, setX] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [])
    useEffect(() => {
        if (x) {
            dispatch(setPaginationAC({user_id:userId}))
            dispatch(getCardPacksTC())
        }
    }, [x])


    if (!isLoggedIn) {
        dispatch(setAppErrorAC("you are not authorized"))
        return <Redirect to={PATH.LOGIN}/>
    }
    const addPack = () => dispatch(addCardPacksTC())





    return (

        <div className={s.table}>
            <h1>Packs</h1>
          my Pack  <input type={"checkbox"} onChange={() => setX(!x)} />
            <div className={s.tableString}>
                <div>Name</div>
                <div>cardsCount</div>
                <div>updated</div>
                <div></div>
                <div><SuperButton onClick={addPack} name={"add"}/></div>
                <div>Cards</div>
            </div>

            {cardPacks.map(packs =>
                <Pack name={packs.name} cardsCount={packs.cardsCount} updated={packs.updated} pack_id={packs._id}
                      userId={packs.user_id}/>
            )}
        </div>
    )
}


