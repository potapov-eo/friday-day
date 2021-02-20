import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import SuperButton from '../SuperButton/SuperButton'
import SuperInput from '../SuperInput/SuperInput'

 export type AddItemPropsType = {    
    addItem:(title:string)=>void
}

export const AddItemForm = React.memo( ({addItem}:AddItemPropsType) => {    
    let [title, setTitle] = useState(" ")

    const addItemTitle = () => { addItem(title); setTitle(" ")}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") {addItemTitle()}}
   
    return (
        <div>
            <SuperInput value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
            <SuperButton onClick={addItemTitle} name={"ADD"} />
        </div>
                
    )
})