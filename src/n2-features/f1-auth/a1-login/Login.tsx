import React, {useState} from 'react';
import SuperInput from '../../../n1-main/m1-ui/common/SuperInput/SuperInput';
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './login-reducer'


export const Login = () => {
    let [emailValue, setEmailValue] = useState<string>("")
    let [passwordValue, setPasswordValue] = useState<string>("")
    let [isChecked, setIsChecked] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleSubmit = (email: string, password: string, rememberMe: boolean ) => {
        const thunk = login(emailValue, passwordValue, isChecked)
            dispatch(thunk)           
    }
    const onchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }
    const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }
    const onchangeRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.currentTarget.checked)
    }
    return (
        <div className="App">
            LOGIN
            <form 
           // @ts-ignore
            onSubmit={handleSubmit}>
               <div><SuperInput onChange={onchangeEmail} value={emailValue} placeholder={"Email"}/></div> 
               <div>    <SuperInput onChange={onchangePassword} value={passwordValue} placeholder={"Password"}/></div> 
               <div><span>Remember me </span><SuperInput onChange={onchangeRememberMe} checked={isChecked} type="checkbox"/></div> 
               <div><SuperButton type={'submit'} /></div>                 
            </form>

        </div>
    )
}


//   "nya-admin@nya.nya", "1qazxcvBG"