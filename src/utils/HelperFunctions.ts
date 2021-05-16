import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC, setUserDataAC, UserDataType } from "../store/app-reduser/app-reduser";
import { AxiosResponse } from "axios";
import { CardsAPI } from "../api/instance";
import { GetCardsResponseType, setCardsAC, setTotalCardsCountAC } from "../store/cards-reduser/Cards-reducer";
import { AppRootStateType } from "../store/store";
import { setIsLoggedIn } from "../store/auth-reduser/auth-reducer";
import { getCardPacksResponseType, setCardPacksAC, } from "../store/packs-reduser/Packs-reduser";
import { call, put, select } from "redux-saga/effects";

export const getResponseError = (e: any) => e.response
    ? e.response.data.error
    : (e.message + ', more details in the console')

export function* handleResponseError(e: any) {
    yield put(setAppStatusAC('failed'))
    const error = getResponseError(e)
    yield put(setAppErrorAC(error))
}

export const handleResponseErrorTH = (e: any, dispatch: Dispatch) => {

    dispatch(setAppStatusAC('failed'))
    const error = getResponseError(e)
    dispatch(setAppErrorAC(error))
}

export function* helperGetCards() {
    const state = yield select()
    const response: AxiosResponse<GetCardsResponseType> = yield call(CardsAPI.getCards, state.cards.paginationCards)
    yield put(setTotalCardsCountAC(response.data.cardsTotalCount))
    yield put(setCardsAC(response.data.cards))
    yield put(setAppStatusAC('succeeded'))
    yield put(setAppErrorAC(null))
}

export function* setResponseData(userData: UserDataType, isLoggedIn: boolean) {
    yield put(setUserDataAC(userData))
    yield put(setIsLoggedIn(isLoggedIn))
    yield call(setSuccessfulResponseData)

}

export function* setSuccessfulResponseData() {
    yield put(setAppErrorAC(null))
    yield put(setAppStatusAC('succeeded'))
}

export const setSuccessfulResponseDataTH = (dispatch: Dispatch) => {
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('succeeded'))
}

export const getCardPacks = async (getState: () => AppRootStateType, dispatch: Dispatch) => {
    const paginationData = getState().packs.pagination
    const response = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
    dispatch(setCardPacksAC(response.data.cardPacks))
    return response
}
