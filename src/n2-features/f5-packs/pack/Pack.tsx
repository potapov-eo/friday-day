import React from 'react'
import s from '../Packs.module.css'
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";

type packPropsType ={
    name:string
    cardsCount?:number
    updated?:string
    pack_id:string
    userId:string
}
export const Pack = (props:packPropsType) => {
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData?state.app.UserData._id:"")
    const myPack =( props.userId === registerUserId)
    return (

        <div className={s.tableString} key={props.pack_id}>
            <div>{props.name}</div>
            <div>{props.cardsCount}</div>
            <div>{props.updated}</div>
            <div><SuperButton disabled={myPack} name={"del"}/></div><div><SuperButton name={"update"}/></div>
            <NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink>
        </div>

    )
}


