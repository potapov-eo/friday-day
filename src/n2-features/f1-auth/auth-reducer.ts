import {Dispatch} from "redux";
import {
     setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    setAppStatusACType, UserDataType
} from "../../n1-main/m2-bll/app-reduser";
import {AuthAPI, recoveryPasswordAPI, RegisterAPI} from "../../n1-main/m3-dal/instance";
import {
    getResponseError,
    handleResponseError,
    setResponseData,
    setSuccessfulResponseData
} from "../../n1-main/m2-bll/common/HelperFunctions";
import {setCardPacksAC} from "../f5-packs/Packs-reduser";
import {setCardAC} from "../f6-cards/Cards-reducer";
import {AxiosResponse} from "axios";


const initialState = {
    recoveryEmail: false, // если true ссылка для восстановления пароля отправлена
    isRegister: false,    // если true  регистрация прошла успешно успешно
    newPassword: false,   // если true  новый пароль введен успешно
    isLoggedIn: false,    // если true  в данный момент залогинены
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "RECOVERY_EMAIL":
            return {...state, recoveryEmail: action.value}
        case 'SET_IS_REGISTER':
            return {...state, isRegister: action.value}
        case "APP_SET_PASSWORD":
            return {...state, newPassword: action.newPassword}
        case "SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}
export const recoveryEmailAC = (value: boolean) => ({type: 'RECOVERY_EMAIL', value} as const)
export const setIsRegister = (value: boolean) => ({type: 'SET_IS_REGISTER', value} as const)
export const setPasswordAC = (newPassword: boolean) => ({type: "APP_SET_PASSWORD", newPassword} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'SET_IS_LOGGED_IN', isLoggedIn} as const)


export const verificationEmailTC = (data: registeredEmailType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await recoveryPasswordAPI.registeredEmail(data)
        dispatch(recoveryEmailAC(true))
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('succeeded'))
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
        setResponseData(dispatch, response.data,  true)
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
            setResponseData(dispatch, response.data,  true)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const logout = () =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await AuthAPI.logout()
            setResponseData(dispatch, null,  false)
            dispatch(setCardPacksAC([]))
            dispatch(setCardAC([]))
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
export type recoveryEmailACType = ReturnType<typeof recoveryEmailAC>
export type setIsRegisterACType = ReturnType<typeof setIsRegister>
export type setPasswordACType = ReturnType<typeof setPasswordAC>
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedIn>
type ActionsType = recoveryEmailACType
    | setAppStatusACType
    | setAppErrorACType
    | setIsRegisterACType
    | setPasswordACType
    | setIsLoggedInACType