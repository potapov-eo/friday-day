import React from 'react'
import s from '../../f5-packs/Packs.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

type cardPropsType ={
    type?:string
    question?:string
    rating?:number
    _id:string
    user_id:string

}
export const Card = (props:cardPropsType) => {
    const registerUserId = useSelector<AppRootStateType, string>(state => state.app.UserData?state.app.UserData._id:"")
    const myPack =( props.user_id === registerUserId)
    return (

        <div className={s.tableString} key={props._id}>
            <div>{props.type}</div>
            <div>{props.question}</div>
            <div>{props.rating}</div>

         {/*   <NavLink to={`${PATH.CARDS}/${props.pack_id}`} activeClassName={s.activeLink}>CARDS</NavLink>*/}
        </div>

    )
}
