import {Dispatch} from "redux";
import {setAppStatusAC, UserDataType} from "../app-reduser/app-reduser";
import {AuthAPI, recoveryPasswordAPI, RegisterAPI} from "../../api/instance";
import {
    getResponseError,
    handleResponseError,
    setResponseData,
    setSuccessfulResponseData
} from "../../utils/HelperFunctions";
import {setCardPacksAC} from "../packs-reduser/Packs-reduser";
import {setCardsAC} from "../cards-reduser/Cards-reducer";
import {AxiosResponse} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    recoveryEmail: false,
    isRegister: false,
    newPassword: false,
    isLoggedIn: false,
}
export type AuthInitialStateType = typeof initialState
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        recoveryEmailAC(state, action: PayloadAction<boolean>) {
            state.recoveryEmail = action.payload
        },
        setIsRegister(state, action: PayloadAction<boolean>) {
            state.isRegister = action.payload
        },
        setPasswordAC(state, action: PayloadAction<boolean>) {
            state.newPassword = action.payload
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },

    }
})
export const {recoveryEmailAC, setIsRegister, setPasswordAC, setIsLoggedIn} = authSlice.actions

export const verificationEmailTC = (data: registeredEmailType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await recoveryPasswordAPI.registeredEmail(data)
        dispatch(recoveryEmailAC(true))
        setSuccessfulResponseData(dispatch)
    } catch (e) {
        handleResponseError(e, dispatch)
    }
}

export const RegisterTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await RegisterAPI.register(data)
        dispatch(setIsRegister(true))
        setSuccessfulResponseData(dispatch)
    } catch (e) {
        handleResponseError(e, dispatch)
    }
}
export const setPasswordTC = (data: SetPasswordType) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await recoveryPasswordAPI.setPassword(data)
            dispatch(setPasswordAC(true))
            setSuccessfulResponseData(dispatch)

        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }
export const getMe = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let response = <AxiosResponse<UserDataType>>await AuthAPI.getAuthMe()
        setResponseData(dispatch, response.data, true)
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        const error = getResponseError(e)
        console.log(error)
        dispatch(setIsLoggedIn(false))
    }
}
export const login = (mail: string, password: string, remember_Me: boolean) =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            let response = <AxiosResponse<UserDataType>>await AuthAPI.login(mail, password, remember_Me)
            setResponseData(dispatch, response.data, true)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const logout = () =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await AuthAPI.logout()
            setResponseData(dispatch, null, false)
            dispatch(setCardPacksAC([]))
            dispatch(setCardsAC([]))
        } catch (e) {
            handleResponseError(e, dispatch)
        }

    }
export type registeredEmailType = {
    email: string
    from: string
    message: string
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type SetPasswordType = {
    password: string
    resetPasswordToken: string
}
export const authReducer = authSlice.reducer