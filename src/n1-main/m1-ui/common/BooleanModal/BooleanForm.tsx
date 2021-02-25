import React, {useState} from 'react'
import SuperButton from '../SuperButton/SuperButton'

export type BooleanFormPropsType = {
    question: string
    push: (isDel: boolean) => void
}

export const BooleanForm = React.memo(({question, push}: BooleanFormPropsType) => {
    let [title, setTitle] = useState("")

    const addItemTitle = (value: boolean) => {

        push(value)

    }

    return (
        <div>
            <div>{question}</div>

            <SuperButton onClick={() => addItemTitle(true)} name={"YES"}/>
            <SuperButton onClick={() => addItemTitle(false)} name={"NO"}/>
        </div>

    )
})