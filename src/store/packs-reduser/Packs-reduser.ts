import {CardsAPI, getCardPacksDataType} from '../../api/instance'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC, setPublicCardPacksCountAC, UserDataType} from "../app-reduser/app-reduser";
import {AppRootStateType} from "../store";
import {
    getCardPacks,
    handleResponseError,
    setSuccessfulResponseData
} from "../../utils/HelperFunctions";
import {setIsLoggedIn} from "../auth-reduser/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
const packSlice = createSlice({
    name: "pack",
    initialState,
    reducers:{
        setCardPacksAC(state, action: PayloadAction< Array<PackType>>){
            state.cardPacks = action.payload
        },
        setPaginationAC(state, action: PayloadAction<setPaginationType>){
            return {...state, pagination: {...state.pagination, ...action.payload}}
        },
        setTotalPacksCountAC(state, action: PayloadAction<number>){
            state.totalPacksCount = action.payload
        },


    }
})
export const { setCardPacksAC, setPaginationAC, setTotalPacksCountAC } = packSlice.actions


//TC


export const getCardPacksTC = () =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await getCardPacks(getState, dispatch)
            const currentPage = getState().packs.pagination.page
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
            dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))

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
            dispatch(setTotalPacksCountAC(response.data.cardPacksTotalCount))
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }

export const updateTC = (id: string, newNamePack: string) =>
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
export const packsReducer =  packSlice.reducer