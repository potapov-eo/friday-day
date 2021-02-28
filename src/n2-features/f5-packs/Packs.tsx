import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {addCardPacksTC, getCardPacksTC, PackType, paginationType, setPaginationAC} from './/Packs-reduser'
import s from './Packs.module.css'
import {Pack} from "./pack/Pack";
import {RequestStatusType, UserDataType} from "../../n1-main/m2-bll/app-reduser";
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import {AddForm} from "../../n1-main/m1-ui/common/Modal/AddForm/AddForm";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";
import {Headings} from "./pack/headings/Headings";

export const Packs = (props: { activeModal: boolean, setActiveModal: (activeModal: boolean) => void }) => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const userId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const {status, UserData} = useSelector<AppRootStateType, { status: RequestStatusType, UserData: UserDataType }>
    (state => state.app)
    const {cardPacks, pagination, totalPacksCount} = useSelector<AppRootStateType,
        { cardPacks: Array<PackType>, pagination: paginationType, totalPacksCount: number }>(state => state.packs)
    const {page, user_id, pageCount} = pagination

    const [isChange, setIsChange] = useState<boolean>(false)
    const [idTimeout, setIdTimeout] = useState<number>(0)
    const [searchName, setSearchName] = useState<string>("")
    const [activeAddPackModal, setActiveAddPackModal] = useState<boolean>(false)
    const [isMyPackChecked, setIsMyPackChecked] = useState<boolean>(false)
    const isLoading = status === 'loading'

    const setChange = useCallback(() => {
        clearTimeout(idTimeout)
        const id = window.setTimeout(() => {
            setIsChange(true)
            setIdTimeout(0)
        }, 1500)
        setIdTimeout(id)
    }, [idTimeout])                                                                   // задержка при поиске

    useEffect(() => {
        if (isChange && !isLoading) {
            dispatch(setPaginationAC({packName: searchName}))
            dispatch(getCardPacksTC())
            setIsChange(false)
        }
        if (user_id) {
            setIsMyPackChecked(true)
        }
    }, [setChange, isChange, setIsChange, setPaginationAC, isLoading])                    //  поиск по имени

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        setChange()
    }                                                                   // колбек для изменения текста инпута поиска


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [isLoggedIn])

    const change = (e: ChangeEvent<HTMLInputElement>) => {              // колбек для изменения чек-бокса мои колоды
        if (e.currentTarget.checked) {
            setIsMyPackChecked(true)
            dispatch(setPaginationAC({user_id: userId}))
            dispatch(getCardPacksTC())

        } else {
            setIsMyPackChecked(false)
            dispatch(setPaginationAC({user_id: ""}))
            dispatch(getCardPacksTC())
        }
    }

    const addPack = (newPackName: string) => {
        dispatch(addCardPacksTC(newPackName))
        setActiveAddPackModal(false)
    }

    const onPageChanged = (pageNumber: number) => {                           // изменение номера страницы пагинатора
        dispatch(setPaginationAC({page: pageNumber}))
        dispatch(getCardPacksTC())
    }

    if (!UserData) {
        return <Redirect to={PATH.LOGIN}/>

    }

    return (

        <div className={s.table}>
            <h1>Packs</h1>
            <div> my Pack <input checked={isMyPackChecked} type={"checkbox"} onChange={change}/></div>
            <div>
                <Paginator currentPage={page} pageSize={pageCount} totalItemsCount={totalPacksCount}
                           portionSize={10}  // пагинатор
                           onPageChanged={onPageChanged}/>
            </div>

            <div> Pack name search: <input value={searchName} onChange={onChangeCallback}/></div>
            {isLoggedIn ? <div className={s.tableString}>

                < Headings setActiveAddPackModal={setActiveAddPackModal}/>

            </div> : <div>"you are not authorized"</div>}

            {cardPacks.map(pack =>
                <Pack key={pack._id} pack={pack}
                      activeModal={props.activeModal} setActiveModal={props.setActiveModal}/>
            )}

            <Paginator currentPage={page} pageSize={pageCount} totalItemsCount={totalPacksCount} portionSize={10}
                       onPageChanged={onPageChanged}/>

            <Modal activeModal={activeAddPackModal} setActiveModal={setActiveAddPackModal}>
                <AddForm addItem={addPack} buttonName={"ADD PACK"} itemName={"pack name"}
                         text={"enter the name of the new pack"}/>
            </Modal>

        </div>
    )
}


