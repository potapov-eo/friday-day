import React from 'react'
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInput from "../../components/SuperInput/SuperInput";
import {Error404} from "../404/Error404";


export const Test = () => {
       return (
        <div className="App">
            <SuperButton/>
            <SuperButton name={"xxx"}/>
            <SuperInput type="text"/>
            <Error404/>
        </div>
    )
}