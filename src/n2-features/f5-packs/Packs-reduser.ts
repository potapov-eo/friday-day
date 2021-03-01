import {CardsAPI, getCardPacksDataType} from '../../../src/n1-main/m3-dal/instance'
import {Dispatch} from 'redux'
import {setAppStatusAC, setPublicCardPacksCountAC} from "../../n1-main/m2-bll/app-reduser";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {
    getCardPacks,
    handleResponseError,
    setSuccessfulResponseData
} from "../../n1-main/m2-bll/common/HelperFunctions";
import {setIsLoggedIn} from "../f1-auth/auth-reducer";


let initialState = {
    cardPacks: [] as Array<PackType>,
    pagination:
        {
            packName: "",//совпадение по имени
            min: 0,
            max: 0,//количество карточек в колоде
            sortPacks: "0updated",// сортировка
            page: 1, //номер страницы
            pageCount: 3,//кол-во элем на странице
            user_id: "",

        },
    totalPacksCount: 0  //кол-во колод
}
export type packsReducerInitialStateType = typeof initialState
export const packsReducer = (state: packsReducerInitialStateType = initialState, action: ActionsType): packsReducerInitialStateType => {

    switch (action.type) {
        case 'SET_CARD_PACKS':
            return {...state, cardPacks: action.cardPacks}
        case 'SET_PAGINATION_PROPERTY':
            return {...state, pagination: {...state.pagination, ...action.property}}
        case "SET-TOTAL-PACKS-COUNT":
            return {...state, totalPacksCount: action.packsCount}

        default:
            return state
    }
}

//AC
export const setCardPacksAC = (cardPacks: Array<PackType>) => ({type: 'SET_CARD_PACKS', cardPacks} as const)
export const setPaginationAC = (property: setPaginationType) => ({type: 'SET_PAGINATION_PROPERTY', property} as const)
export const setTotalPacksCountAC = (packsCount: number) => ({type: "SET-TOTAL-PACKS-COUNT", packsCount} as const)
//TC


export const getCardPacksTC = (getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await getCardPacks(getState, dispatch)
            const currentPage = getData.page
            currentPage && dispatch(setPaginationAC({page: currentPage}))
            dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
            setSuccessfulResponseData(dispatch)
            dispatch(setIsLoggedIn(true))
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const addCardPacksTC = (newPackName: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await CardsAPI.createCardsPack(newPackName)
            const response = await getCardPacks(getState, dispatch)
            dispatch(setPublicCardPacksCountAC(response.data.cardPacksTotalCount))
            setSuccessfulResponseData(dispatch)

        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const removePackTC = (idCarsPack: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await CardsAPI.deleteCardsPack(idCarsPack)
            const response = await getCardPacks(getState, dispatch)
            dispatch(setPublicCardPacksCountAC(response.data.cardPacksTotalCount))
            setSuccessfulResponseData(dispatch)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const updateTC = (id: string, newNamePack: string, getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await CardsAPI.updateCardsPack(id, newNamePack)
            await getCardPacks(getState, dispatch)
            setSuccessfulResponseData(dispatch)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }


//types
type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setPaginationAC>
    | ReturnType<typeof setTotalPacksCountAC>


export type PackType = {
    _id: string
    user_id: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
}
export type getCardPacksResponseType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number                  // totalItemsCount
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: Date
}
export type setPaginationType =
    { packName: string }
    | { min: number }
    | { max: number }
    | { sortPacks: string }
    | { page: number }
    | { pageCount: number }
    | { user_id: string }

export type paginationType = {
    packName: string
    min: number,
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string

}