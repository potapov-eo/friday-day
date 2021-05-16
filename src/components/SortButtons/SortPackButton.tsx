import React from 'react'
import s from './SortButtons.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'
import { setPaginationAC} from '../../store/packs-reduser/Packs-reduser'
import {useDispatch} from 'react-redux'
import { getCardPacksAC } from "../../store/packs-reduser/packs-sagas";

export const SortPackButton = (props: { param: string }) => {
    const dispatch = useDispatch()

    const sortUp = (param: string) => {
        dispatch(setPaginationAC({sortPacks: `1` + param}))
        dispatch(getCardPacksAC())
    }
    const sortDown = (param: string) => {
        dispatch(setPaginationAC({sortPacks: `0` + param}))
        dispatch(getCardPacksAC())
    }
    return <div className={s.tableSortIcons}>
        <a type="submit" onClick={() => sortUp(props.param)}><FontAwesomeIcon icon={faSortUp} size="1x"/></a>
        <a type="submit" onClick={() => sortDown(props.param)}><FontAwesomeIcon icon={faSortDown} size="1x"/></a>
    </div>
}
