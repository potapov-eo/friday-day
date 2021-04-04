import {CardsAPI} from "../../api/instance";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app-reduser/app-reduser";
import {AxiosResponse} from "axios";
import {AppRootStateType} from "../store";
import {valueType} from "../../components/modal/AddCardForm/AddCardForm";
import {getCards, handleResponseError} from "../../utils/HelperFunctions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCardsAC(state, action: PayloadAction<Array<CardType>>) {
            state.cards = action.payload
        },
        setTotalCardsCountAC(state, action: PayloadAction<number>) {
            state.totalCardsCount = action.payload
        },
        setPaginationCardAC(state, action: PayloadAction<setPaginationCardType>) {
            return {...state, paginationCards: {...state.paginationCards, ...action.payload}}
        },
        setCardGradeAC(state, action: PayloadAction<{ card_id: string, grade: number }>) {
            /* const newCards = state.cards.map((card) => card._id === action.payload.card_id ? {
                 ...card,
                 grade: action.payload.grade
             } : card)
             return {...state, cards: newCards}*/
            const index = state.cards.findIndex((card) => card._id === action.payload.card_id)
            state.cards[index].grade = action.payload.grade
        },

    }
})
export const {setCardsAC, setTotalCardsCountAC, setPaginationCardAC, setCardGradeAC} = cardsSlice.actions


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
            dispatch(setCardGradeAC({card_id, grade: newGrade}))
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
export const cardsReducer = cardsSlice.reducer