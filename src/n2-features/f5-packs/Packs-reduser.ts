import {CardsAPI, cardsPackType, getCardPacksDataType} from '../../../src/n1-main/m3-dal/instance'
import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from "../../n1-main/m2-bll/app-reduser";
import {AxiosResponse} from "axios";

export type InitialStateType = typeof initialState
let initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARD-PACKS':
            return {...state, cardPacks: action.cardPacks}


        default:
            return state
    }
}

//AC
export const setCardPacksAC = (cardPacks: Array<PackType>) => ({type: 'CARDS/SET-CARD-PACKS', cardPacks} as const)
export const removePackAC = (packId: string) => ({type: 'CARDS/REMOVE-PACK', packId} as const)
export const addPackAC = (pack: PackType) => ({type: 'CARDS/ADD-PACK', pack} as const)
export const updatePackAC = (packId: string, pack: PackType) => ({type: 'CARDS/UPDATE-PACK', packId, pack} as const)

//TC

export const getCardPacksTC = (getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(getData)
            const packs = response.data.cardPacks
                        dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }
export const addCardPacksTC = (getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const createResponse = await CardsAPI.createCardsPack()
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(getData)
            const packs = getResponse.data.cardPacks
              dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }
export const deleteTC = (idCarsPack: string, getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const deleteResponse = await CardsAPI.deleteCardsPack(idCarsPack)
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(getData)
            const packs = getResponse.data.cardPacks
             dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }
export const updateTC = (cardsPack: cardsPackType, getData: getCardPacksDataType = {}) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const deleteResponse = await CardsAPI.updateCardsPack(cardsPack)
            const getResponse = <AxiosResponse<getCardPacksResponseType>>await CardsAPI.getCardPacks(getData)
            const packs = getResponse.data.cardPacks
            dispatch(setCardPacksAC(packs))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')

            dispatch(setAppErrorAC(error))
        }
    }


//types
type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>

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
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: Date
}


