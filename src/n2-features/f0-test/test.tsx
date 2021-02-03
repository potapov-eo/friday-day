import React from 'react'
import SuperButton from "../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../n1-main/m1-ui/common/SuperInput/SuperInput";


export const Test = () => {
    return (
        <div className="App">
            <SuperButton />
            <SuperButton name={"xxx"}/>
            <SuperInput type="text" />

        </div>
    )
}