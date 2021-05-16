import { call, put, takeEvery } from "redux-saga/effects";
import { setAppStatusAC, UserDataType } from "../app-reduser/app-reduser";
import { AxiosResponse } from "axios";
import { AuthAPI } from "../../api/instance";
import { getResponseError, setResponseDataSG } from "../../utils/HelperFunctions";
import { setIsLoggedIn } from "./auth-reducer";

export function* getMe() {
    try {
        debugger
        yield put(setAppStatusAC('loading'))
        let response: AxiosResponse<UserDataType> = yield call(AuthAPI.getAuthMe)
        debugger
        yield call(setResponseDataSG, response.data, true)
    } catch (e) {
        yield put(setAppStatusAC('failed'))
        const error = getResponseError(e)
        console.log(error)
        yield put(setIsLoggedIn(false))
    }
}

export const getMeACT = () => ({ type: 'GET-ME' } as const)

export function* authSaga() {
    yield takeEvery('GET-ME', getMe)
}
