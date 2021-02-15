import {CardsAPI} from "../../n1-main/m3-dal/instance";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../n1-main/m2-bll/app-reduser";

type InitialStateType = {
cards:Array<CardType>
}
const initialState={
   cards : []
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return { ...state, cards: action.cards }


        default:
            return state
    }
}

export const setCardAC = (cards: Array<CardType>) => ({ type: 'SET-CARDS', cards } as const)
export const getCardTC = (packId:string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = <any> await  CardsAPI.getCards(packId)
            const cards = response.data.cards
            dispatch(setCardAC(cards))
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

type ActionsType = ReturnType<typeof setCardAC>

type GetCardsResponseType = {
    cards:Array<CardType>
    packUserId:string
    page:number
    pageCount:number
    cardsTotalCount:number
    minGrade:number
    token:string
    tokenDeathTime:Date
}
export type CardType ={
    _id:string
    cardsPack_id:string
    user_id:string
    answer:string
    question:string
    grade:number
    shots:number
    comments:string
    type:string
    rating:number
    more_id:string
    created:string
    updated:string
    __v:number
    answerImg:string
    questionImg:string
    questionVideo:string
}
