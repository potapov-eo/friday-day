import React from 'react'
import s from './SortButtons.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { setPaginationCardAC } from "../../store/cards-reduser/Cards-reducer";
import { getCardsAC } from "../../store/cards-reduser/cards-sagas";

export const SortCardButton = (props: { param: string }) => {
    const dispatch = useDispatch()

    const sortUp = (param: string) => {
        dispatch(setPaginationCardAC({ sortCards: `1` + param }))
        dispatch(getCardsAC())
    }
    const sortDown = (param: string) => {
        dispatch(setPaginationCardAC({ sortCards: `0` + param }))
        dispatch(getCardsAC())
    }
    return <div className={s.tableSortIcons}>
        <a type="submit" onClick={() => sortUp(props.param)}><FontAwesomeIcon icon={faSortUp} size="1x"/></a>
        <a type="submit" onClick={() => sortDown(props.param)}><FontAwesomeIcon icon={faSortDown} size="1x"/></a>
    </div>
}
