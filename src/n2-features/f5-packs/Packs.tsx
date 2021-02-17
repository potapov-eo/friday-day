import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {addCardPacksTC, getCardPacksTC, PackType, setPaginationAC} from './/Packs-reduser'
import s from './Packs.module.css'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Pack} from "./pack/Pack";
import {RequestStatusType, setAppErrorAC} from "../../n1-main/m2-bll/app-reduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";

export const Packs = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const cardPacks = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()
    const [isChange, setIsChange] = useState<boolean>(false)
    const [idTimeout, setIdTimeout] = useState<number>(0)
    const [searchName, setSearchName] = useState<string>("")
    const isLoading = status === 'loading'

    const [firstRender, setFirstRender] = useState<boolean>(true)

    const setChange = useCallback(() => {
        clearTimeout(idTimeout)
        const id = window.setTimeout(() => {
            setIsChange(true)
            setIdTimeout(0)
        }, 1500)
        setIdTimeout(id)
    }, [idTimeout])

    useEffect(() => {
        if (isChange && !isLoading) {
            dispatch(setPaginationAC({packName: searchName}))
            dispatch(getCardPacksTC())
            setIsChange(false)
        }
    }, [setChange, isChange, setIsChange, setPaginationAC, isLoading])


   /* useEffect(() => {

        if (firstRender) {
            dispatch(getCardPacksTC())
            setFirstRender(false)
        }
    }, [firstRender])*/
    useEffect(() => {

        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [isLoggedIn])

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            dispatch(setPaginationAC({user_id: userId}))
            dispatch(getCardPacksTC())

        } else {
            dispatch(setPaginationAC({user_id: ""}))
            dispatch(getCardPacksTC())

        }
    }

    if (!isLoggedIn) {
        dispatch(setAppErrorAC("you are not authorized)"))
        return <Redirect to={PATH.LOGIN}/>
    }
    const addPack = () => dispatch(addCardPacksTC())
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        setChange()
    }
    return (

        <div className={s.table}>
            <h1>Packs</h1>
            {/*<div> my Pack <input type={"checkbox"} onChange={() => setX(!x)}/></div>*/}
            <div> my Pack <input type={"checkbox"} onChange={change}/></div>
            <div> Pack name search: <input value={searchName} onChange={onChangeCallback}/></div>
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


