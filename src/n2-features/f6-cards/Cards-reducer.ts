import {CardsAPI} from "../../n1-main/m3-dal/instance";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../n1-main/m2-bll/app-reduser";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {valueType} from "../../n1-main/m1-ui/common/AddCardForm/AddCardForm";
import {getResponseError} from "../../n1-main/m2-bll/common/HelperFunctions";


const initialState = {
    cards: [] as Array<CardType>,
    paginationCards: {
        page: 1,
        pageCount: 3,
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: ''
    },
    totalCardsCount: 0
}

export type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, cards: action.cards}
        case "SET_TOTAL_CARDS_COUNT":
            return {...state, totalCardsCount: action.packsCount}
        case 'SET_PAGINATION_CARD_PROPERTY':
            return {...state, paginationCards: {...state.paginationCards, ...action.property}}
        default:
            return state
    }
}

//AC
export const setPaginationCardAC = (property: setPaginationCardType) => ({
    type: 'SET_PAGINATION_CARD_PROPERTY',
    property
} as const)
export const setCardAC = (cards: Array<CardType>) => ({type: 'SET_CARDS', cards} as const)
export const setTotalCardsCountAC = (packsCount: number) => ({type: "SET_TOTAL_CARDS_COUNT", packsCount} as const)

//TC


export const getCardTC = () =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))

            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards

            dispatch(setTotalCardsCountAC(response.data.cardsTotalCount))
            dispatch(setCardAC(cards))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = getResponseError(e)
            dispatch(setAppErrorAC(error))
        }
    }
export const addCardTC = (cardsPack_id: string, values: { question: string, answer: string }) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))

            const addResponse = <AxiosResponse<any>>await CardsAPI.createCard(cardsPack_id, values)
            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setTotalCardsCountAC(response.data.cardsTotalCount))
            dispatch(setCardAC(cards))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))

        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = getResponseError(e)
            dispatch(setAppErrorAC(error))
        }
    }
export const removeCardTC = (cardsPack_id: string, cardId: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const removeResponse = <AxiosResponse<any>>await CardsAPI.deleteCard(cardId)
            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setTotalCardsCountAC(response.data.cardsTotalCount))
            dispatch(setCardAC(cards))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = getResponseError(e)
            dispatch(setAppErrorAC(error))
        }
    }
export const updateCardTC = (cardId: string, value: valueType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const removeResponse = <AxiosResponse<any>>await CardsAPI.updateCard(cardId, value.question, value.answer)

            const paginationData = getState().cards.paginationCards
            const response = <AxiosResponse<GetCardsResponseType>>await CardsAPI.getCards(paginationData)
            const cards = response.data.cards
            dispatch(setCardAC(cards))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = getResponseError(e)
            dispatch(setAppErrorAC(error))
        }
    }
export const gradeCardTC = (grade: number, card_id: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const Response = <AxiosResponse<any>>await CardsAPI.gradeCard(grade, card_id)

            const newCards = <CardType[]>getState().cards.cards.map((card) => card._id === card_id ? {
                ...card,
                grade: Response.data.updatedGrade.grade
            } : card)
            dispatch(setCardAC(newCards))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = getResponseError(e)
            dispatch(setAppErrorAC(error))
        }
    }


type ActionsType = ReturnType<typeof setCardAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setPaginationCardAC>

export type GetCardsResponseType = {
    cards: Array<CardType>
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    token: string
    tokenDeathTime: Date
}
export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    questionImg: string
    questionVideo: string
}
export type setPaginationCardType =
    { page: number }
    | { pageCount: number }
    | { cardAnswer: string }
    | { cardQuestion: string }
    | { cardsPack_id: string }
    | { min: number }
    | { max: number }
    | { sortCards: string }
export type paginationCardsType= {
    page: number
        pageCount: number,
        cardAnswer: string,
        cardQuestion: string,
        cardsPack_id: string,
        min: number,
        max: number,
        sortCards: string
}
