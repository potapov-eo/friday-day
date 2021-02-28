import {Dispatch} from "redux";
import {
     RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
    setUserDataAC,
    UserDataType
} from "../app-reduser";
import {AxiosResponse} from "axios";
import {CardsAPI} from "../../m3-dal/instance";
import {GetCardsResponseType, setCardAC, setTotalCardsCountAC} from "../../../n2-features/f6-cards/Cards-reducer";
import {AppRootStateType} from "../store";
import {setIsLoggedIn} from "../../../n2-features/f1-auth/auth-reducer";
import {
    getCardPacksResponseType,
    setCardPacksAC,


} from "../../../n2-features/f5-packs/Packs-reduser";

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
    dispatch(setCardAC(cards))
    dispatch(setAppStatusAC('succeeded'))
    dispatch(setAppErrorAC(null))
}
export const setResponseData = (dispatch: Dispatch, userData: UserDataType,  isLoggedIn: boolean) => {
    dispatch(setUserDataAC(userData))
    dispatch(setIsLoggedIn(isLoggedIn))
    setSuccessfulResponseData(dispatch)

}
export const setSuccessfulResponseData=(dispatch: Dispatch)=>{
    dispatch(setAppErrorAC(null))
    dispatch(setAppStatusAC('succeeded'))
}
export const getCardPacks= async (getState: () => AppRootStateType, dispatch: Dispatch) => {
    const paginationData = getState().packs.pagination
    const response = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(paginationData)
    const packs = response.data.cardPacks
    dispatch(setCardPacksAC(packs))

    const cardPacksTotalCount = response.data.cardPacksTotalCount



    setSuccessfulResponseData(dispatch)
    dispatch(setIsLoggedIn(true))
}