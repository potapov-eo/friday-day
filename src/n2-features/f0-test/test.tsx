import React from 'react'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../n1-main/m1-ui/common/SuperInput/SuperInput";
import Preloader from "../../n1-main/m1-ui/common/Preloder/Preloader";
import {Error404} from "../f4-404/Error404";


export const Test = () => {
    return (
        <div className="App">
            <SuperButton />
            <SuperButton name={"xxx"}/>
            <SuperInput type="text" />
            <Preloader/>
            <Error404/>
        </div>
    )
}