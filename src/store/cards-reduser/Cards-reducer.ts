import {CardsAPI} from "../../api/instance";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app-reduser/app-reduser";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../store";
import {valueType} from "../../components/modal/AddCardForm/AddCardForm";
import {getCards, handleResponseError} from "../../utils/HelperFunctions";


const initialState = {
    cards: [] as Array<CardType>,
    paginationCards: {
        page: 1,
        pageCount: 3,
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 6,
        sortCards: ''
    },
    totalCardsCount: 0
}

export type cardsReducerInitialStateType = typeof initialState

export const cardsReducer = (state: cardsReducerInitialStateType = initialState, action: ActionsType): cardsReducerInitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, cards: action.cards}
        case "SET_TOTAL_CARDS_COUNT":
            return {...state, totalCardsCount: action.packsCount}
        case 'SET_PAGINATION_CARD_PROPERTY':
            return {...state, paginationCards: {...state.paginationCards, ...action.property}}
        case 'SET_CARD_GRADE':
            const newCards = state.cards.map((card) => card._id === action.card_id ? {
                ...card,
                grade: action.grade
            } : card)
            return {...state, cards: newCards}

        default:
            return state
    }
}

//AC

export const setCardsAC = (cards: Array<CardType>) => ({type: 'SET_CARDS', cards} as const)
export const setTotalCardsCountAC = (packsCount: number) => ({type: "SET_TOTAL_CARDS_COUNT", packsCount} as const)
export const setPaginationCardAC = (property: setPaginationCardType) =>
    ({type: 'SET_PAGINATION_CARD_PROPERTY', property} as const)
export const setCardGradeAC = (card_id: string, grade: number) => ({type: "SET_CARD_GRADE", card_id, grade} as const)
//TC


export const getCardTC = () =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await getCards(getState, dispatch)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }
export const addCardTC = (cardsPack_id: string, values: { question: string, answer: string }) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
           await CardsAPI.createCard(cardsPack_id, values)
            await getCards(getState, dispatch)

        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }
export const removeCardTC = (cardsPack_id: string, cardId: string) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await CardsAPI.deleteCard(cardId)
            await getCards(getState, dispatch)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }
export const updateCardTC = (cardId: string, value: valueType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await CardsAPI.updateCard(cardId, value.question, value.answer)
            await getCards(getState, dispatch)
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }
export const gradeCardTC = (grade: number, card_id: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const Response = <AxiosResponse<any>>await CardsAPI.gradeCard(grade, card_id)
            const newGrade = Response.data.updatedGrade.grade
            dispatch(setCardGradeAC(card_id, newGrade))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            handleResponseError(e, dispatch)
        }
    }


type ActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setPaginationCardAC>
    | ReturnType<typeof setCardGradeAC>

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
export type paginationCardsType = {
    page: number
    pageCount: number,
    cardAnswer: string,
    cardQuestion: string,
    cardsPack_id: string,
    min: number,
    max: number,
    sortCards: string
}
