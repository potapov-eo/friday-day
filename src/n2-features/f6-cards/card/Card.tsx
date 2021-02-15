import React from 'react'
import s from '../../f5-packs/Packs.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../Cards-reducer";

type cardPropsType = {
    card: CardType
}
export const Card = (props: cardPropsType) => {
    const  card = props.card
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isMyPack =( card.user_id === registerUserId)

    return (

        <div className={s.tableString} key={card._id}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>{card.grade}</div>
            <div>{card.updated}</div>
            <div><button disabled={isMyPack}>del</button></div>
            <div><button disabled={isMyPack}>update</button></div>

            {/*   <NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink>*/}
        </div>

    )
}
