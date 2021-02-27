import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../src/n1-main/m2-bll/store'
import {addCardPacksTC, getCardPacksTC, PackType, setPaginationAC} from './/Packs-reduser'
import s from './Packs.module.css'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {Pack} from "./pack/Pack";
import {RequestStatusType} from "../../n1-main/m2-bll/app-reduser";
import {SortButtons} from '../../n1-main/m1-ui/common/SortButtons/SortButtons'
import {Paginator} from "../../n1-main/m1-ui/common/Paginator/Paginator";
import {Modal} from '../../n1-main/m1-ui/common/Modal/Modal'
import {AddForm} from "../../n1-main/m1-ui/common/AddForm/AddForm";


export const Packs = (props: { activeModal: boolean, setActiveModal: (activeModal: boolean) => void }) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)
    const userId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const cardPacks = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const page = useSelector<AppRootStateType, number>(state => state.packs.pagination.page)
    const paginationUserId = useSelector<AppRootStateType, string>(state => state.packs.pagination.user_id)

    const dispatch = useDispatch()
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
    }, [idTimeout])

    useEffect(() => {
        if (isChange && !isLoading) {
            dispatch(setPaginationAC({packName: searchName}))
            dispatch(getCardPacksTC())
            setIsChange(false)
        }
        if (paginationUserId) {
            setIsMyPackChecked(true)
        }
    }, [setChange, isChange, setIsChange, setPaginationAC, isLoading])


    useEffect(() => {

        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [isLoggedIn])

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
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

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        setChange()
    }

    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pagination.pageCount)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)

    const onPageChanged = (pageNumber: number) => {
        dispatch(setPaginationAC({page: pageNumber}))
        dispatch(getCardPacksTC())
    }
    /*if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>

    }*/

    return (

        <div className={s.table}>
            <h1>Packs</h1>
            <div> my Pack <input checked={isMyPackChecked} type={"checkbox"} onChange={change}/></div>
            <div>
                <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={10}
                           onPageChanged={onPageChanged}/>
            </div>

            <div> Pack name search: <input value={searchName} onChange={onChangeCallback}/></div>
            {isLoggedIn ? <div className={s.tableString}>


                <div className={s.tableColumnTitle}>
                    <h2> Name</h2>
                    <SortButtons param="name"/>
                </div>
                <div className={s.tableColumnTitle}>
                    <h2> CardsCount</h2>
                    <SortButtons param="cardsCount"/>
                </div>
                <div className={s.tableColumnTitle}>
                    <h2> Updated</h2>
                    <SortButtons param="updated"/>
                </div>
                <div><SuperButton onClick={() => {
                    setActiveAddPackModal(true)
                }} name={"add"}/></div>
                <div className={s.tableColumnTitle}></div>
                <div className={s.tableColumnTitle}><h2> Cards</h2></div>
                <div className={s.tableColumnTitle}><h2> Learn</h2></div>

            </div> : <div>"you are not authorized"</div>}

            <Modal activeModal={activeAddPackModal} setActiveModal={setActiveAddPackModal}>
                {/* <AddItemForm addItem={addPack} buttonName={"add"}/>*/}
                <AddForm addItem={addPack} buttonName={"ADD PACK"} itemName={"pack name"}
                         text={"enter the name of the new pack"}/>
            </Modal>

            {cardPacks.map(packs =>
                <Pack name={packs.name} cardsCount={packs.cardsCount} updated={packs.updated?.slice(0, 10)}
                      pack_id={packs._id}
                      userId={packs.user_id} activeModal={props.activeModal} setActiveModal={props.setActiveModal}/>
            )}

            <Paginator currentPage={page} pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={10}
                       onPageChanged={onPageChanged}/>

        </div>
    )
}


