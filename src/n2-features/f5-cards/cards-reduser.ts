import { CardsAPI } from '../../../src/n1-main/m3-dal/instance'
import { Dispatch } from 'redux'

let initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARD-PACKS':
            return { ...state, cardPacks: action.cardPacks }
        case 'CARDS/REMOVE-PACK':
               
        case 'CARDS/ADD-PACK':
            
        case 'CARDS/UPDATE-PACK':
            
        default:
            return state
    }
}

//AC
export const setCardPacksAC = (cardPacks: Array<PackType>) => ({ type: 'CARDS/SET-CARD-PACKS', cardPacks } as const)
export const removePackAC = (packId: string) => ({ type: 'CARDS/REMOVE-PACK', packId} as const) 
export const addPackAC = (pack: PackType) => ({ type: 'CARDS/ADD-PACK', pack} as const)
export const updatePackAC = (packId: string, pack: PackType) => ({ type: 'CARDS/UPDATE-PACK', packId, pack} as const)

//TC
export const getCardPacksTC = () =>
    async (dispatch: Dispatch) => {
        try {
            const response: any = await CardsAPI.getCardPacks()
            const cards = response.data.cardPacks
            dispatch(setCardPacksAC(cards))
        } catch (error) {
        }
    }
//types
type ActionsType = 
| ReturnType<typeof setCardPacksAC>
| ReturnType<typeof removePackAC>
| ReturnType<typeof addPackAC>
| ReturnType<typeof updatePackAC>

export type PackType = {
    _id?: string
    user_id?: string
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

export type InitialStateType = typeof initialState

