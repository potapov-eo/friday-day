import {Dispatch} from "redux";
import {
     RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
    setUserDataAC,
    UserDataType
} from "../store/app-reduser/app-reduser";
import {AxiosResponse} from "axios";
import {CardsAPI} from "../api/instance";
import {GetCardsResponseType, setCardsAC, setTotalCardsCountAC} from "../store/cards-reduser/Cards-reducer";
import {AppRootStateType} from "../store/store";
import {setIsLoggedIn} from "../store/auth-reduser/auth-reducer";
import {
    getCardPacksResponseType,
    setCardPacksAC,


} from "../store/packs-reduser/Packs-reduser";
import { call, put } from "redux-saga/effects";

export const getResponseError = (e: any) => e.response
    ? e.response.data.error
    : (e.message + ', more details in the console')

export const handleResponseError = (e: any, dispatch: Dispatch) => {

    dispatch(setAppStatusAC('failed'))
    const error = getResponseError(e)
    dispatch(setAppErrorAC(error))
}
export const getCards = async (getState: () => AppRootStateType, dispatch: Dispatch) => {
    const paginationData = getState().cards.paginationCards
    const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
    const cards = response.data.cards
    dispatch(setTotalCardsCountAC(response.data.cardsTotalCount))
    dispatch(setCardsAC(cards))
    dispatch(setAppStatusAC('succeeded'))
    dispatch(setAppErrorAC(null))
}
export const setResponseData = (dispatch: Dispatch, userData: UserDataType,  isLoggedIn: boolean) => {
    dispatch(setUserDataAC(userData))
    dispatch(setIsLoggedIn(isLoggedIn))
    setSuccessfulResponseData(dispatch)

}
export function* setResponseDataSG ( userData: UserDataType,  isLoggedIn: boolean) {
    yield put (setUserDataAC(userData))
    yield put (setIsLoggedIn(isLoggedIn))
    yield call (setSuccessfulResponseDataSG)

}
export const setSuccessfulResponseData=(dispatch: Dispatch)=>{
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('succeeded'))
}
export function*  setSuccessfulResponseDataSG(){
    yield put(setAppErrorAC(null))
    yield put (setAppStatusAC('succeeded'))
}
export const getCardPacks= async (getState: () => AppRootStateType, dispatch: Dispatch) => {
    const paginationData = getState().packs.pagination
    const response = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
    dispatch(setCardPacksAC(response.data.cardPacks))
    return response
}
