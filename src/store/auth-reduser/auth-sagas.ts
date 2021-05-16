import { call, put, takeEvery } from "redux-saga/effects";
import { setAppStatusAC, UserDataType } from "../app-reduser/app-reduser";
import { AxiosResponse } from "axios";
import { AuthAPI, recoveryPasswordAPI, RegisterAPI } from "../../api/instance";
import {
    getResponseError,
    handleResponseError,
    setResponseData,
    setSuccessfulResponseData
} from "../../utils/HelperFunctions";
import {
    recoveryEmailAC,
    registeredEmailType,
    RegisterParamsType,
    setIsLoggedIn,
    setIsPasswordAC,
    setIsRegister,
    SetPasswordType
} from "./auth-reducer";
import { setCardPacksAC } from "../packs-reduser/Packs-reduser";
import { setCardsAC } from "../cards-reduser/Cards-reducer";


export function* getMe() {
    try {
        yield put(setAppStatusAC('loading'))
        let response: AxiosResponse<UserDataType> = yield call(AuthAPI.getAuthMe)
        yield call(setResponseData, response.data, true)
    } catch (e) {
        yield put(setAppStatusAC('failed'))
        const error = getResponseError(e)
        console.log(error)
        yield put(setIsLoggedIn(false))
    }
}

export function* login(action: ReturnType<typeof loginAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        let response: AxiosResponse<UserDataType> = yield call(AuthAPI.login, action.mail, action.password, action.remember_Me)
        yield call(setResponseData, response.data, true)
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* logout() {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(AuthAPI.logout)
        yield call(setResponseData, null, false)
        yield put(setCardPacksAC([]))
        yield put(setCardsAC([]))
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* verificationEmail(action: ReturnType<typeof verificationEmailAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(recoveryPasswordAPI.registeredEmail, action.data)
        yield put(recoveryEmailAC(true))
        yield call(setSuccessfulResponseData)
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* Register(action: ReturnType<typeof registerAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(RegisterAPI.register, action.data)
        yield put(setIsRegister(true))
        yield call(setSuccessfulResponseData)
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* setPassword(action: ReturnType<typeof setPasswordAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(recoveryPasswordAPI.setPassword, action.data)
        yield put(setIsPasswordAC(true))
        yield call(setSuccessfulResponseData)
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export const getMeAC = () => ({ type: 'AUTH-SAGAS/GET-ME' } as const)
export const loginAC = (mail: string, password: string, remember_Me: boolean) =>
    ({ type: 'AUTH-SAGAS/LOGIN', mail, password, remember_Me } as const)
export const logoutAC = () =>
    ({ type: 'AUTH-SAGAS/LOGOUT' } as const)
export const verificationEmailAC = (data: registeredEmailType) =>
    ({ type: 'AUTH-SAGAS/VERIFICATION-EMAIL', data } as const)
export const registerAC = (data: RegisterParamsType) =>
    ({ type: 'AUTH-SAGAS/REGISTER', data } as const)
export const setPasswordAC = (data: SetPasswordType) =>
    ({ type: 'AUTH-SAGAS/SET-PASSWORD', data } as const)


export function* authSaga() {
    yield takeEvery('AUTH-SAGAS/LOGIN', login)
    yield takeEvery('AUTH-SAGAS/GET-ME', getMe)
    yield takeEvery('AUTH-SAGAS/LOGOUT', logout)
    yield takeEvery('AUTH-SAGAS/VERIFICATION-EMAIL', verificationEmail)
    yield takeEvery('AUTH-SAGAS/REGISTER', Register)
    yield takeEvery('AUTH-SAGAS/SET-PASSWORD', setPassword)
}
