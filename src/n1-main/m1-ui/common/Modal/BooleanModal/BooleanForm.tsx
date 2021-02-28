import React from 'react'
import SuperButton from '../../SuperButton/SuperButton'

export type BooleanFormPropsType = {
    question?: string
    push: (isDel: boolean) => void
}

export const BooleanForm = React.memo(({question, push}: BooleanFormPropsType) => {

    const addItemTitle = (value: boolean) => {
        push(value)
    }

    return (
        <div>
            <div>{question}</div>

            <SuperButton type="submit" onClick={() => addItemTitle(true)} name={"YES"}/>
            <SuperButton type="submit" onClick={() => addItemTitle(false)} name={"NO"}/>
        </div>

    )
})