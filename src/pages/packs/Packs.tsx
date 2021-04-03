import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import s from './Packs.module.css'
import {Pack} from "../../components/pack/Pack";
import {Paginator} from "../../components/Paginator/Paginator";
import {Modal} from '../../components/modal/Modal'
import {AddForm} from "../../components/modal/AddForm/AddForm";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import {Headings} from "../../components/pack/headings/Headings";
import SuperInput from "../../components/SuperInput/SuperInput";
import {selectorIsLoggedIn} from "../../store/auth-reduser/authSelector";
import {selectorStatus, selectorUserData, selectorUserId} from "../../store/app-reduser/appSelector";
import {selectorCardPacks, selectorPagination, selectorTotalPacksCount} from "../../store/packs-reduser/packSelector";
import {addCardPacksTC, getCardPacksTC, setPaginationAC} from "../../store/packs-reduser/Packs-reduser";


export const Packs = (props: { activeModal: boolean, setActiveModal: (activeModal: boolean) => void }) => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(selectorIsLoggedIn)
    const userId = useSelector(selectorUserId)
    const UserData = useSelector(selectorUserData)
    const status = useSelector(selectorStatus)
    const cardPacks = useSelector(selectorCardPacks)
    const pagination = useSelector(selectorPagination)
    const totalPacksCount = useSelector(selectorTotalPacksCount)
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
    }, [idTimeout])

    useEffect(() => {
        if (isChange && !isLoading) {
            dispatch(setPaginationAC({packName: searchName}))
            dispatch(getCardPacksTC())
            setIsChange(false)
        }
        if (user_id) {
            setIsMyPackChecked(true)
        }
    }, [setChange, isChange, setIsChange, setPaginationAC, isLoading])

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        setChange()
    }


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCardPacksTC())
        }
    }, [isLoggedIn])

    const change = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onPageChanged = (pageNumber: number) => {
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

            <div className={s.search}> Pack name search: <SuperInput value={searchName} onChange={onChangeCallback}/>
            </div>

            {isLoggedIn ? <div className={s.tableString}>
                < Headings setActiveAddPackModal={setActiveAddPackModal}/>
            </div> : <>
                <div>"you are not authorized"</div>
                <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}>{"LOGIN >>> >>> >>> "}</NavLink>
            </>}

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


