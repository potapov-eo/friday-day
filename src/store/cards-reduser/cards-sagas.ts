import { Dispatch } from "redux";
import { AppRootStateType } from "../store";
import { setAppErrorAC, setAppStatusAC } from "../app-reduser/app-reduser";
import { handleResponseError, helperGetCards } from "../../utils/HelperFunctions";
import { CardsAPI } from "../../api/instance";
import { valueType } from "../../components/modal/AddCardForm/AddCardForm";
import { AxiosResponse } from "axios";
import { setCardGradeAC } from "./Cards-reducer";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getCards() {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(helperGetCards)
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* addCard(action: ReturnType<typeof addCardAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(CardsAPI.createCard, action.cardsPack_id, action.values)
        yield call(helperGetCards)
    } catch (e) {
        yield call(handleResponseError, e)
        throw new Error("add card error")
    }
}

export function* removeCard (action: ReturnType<typeof removeCardAC>){
        try {
            yield put(setAppStatusAC('loading'))
            yield call( CardsAPI.deleteCard, action.cardId)
            yield call(helperGetCards)
        } catch (e) {
            yield call(handleResponseError, e)
        }
    }
export function* updateCard (action: ReturnType<typeof updateCardAC>) {
        try {
            yield put(setAppStatusAC('loading'))
            yield call (CardsAPI.updateCard, action.cardId, action.value.question, action.value.answer)
            yield call(helperGetCards)
        } catch (e) {
            yield call(handleResponseError, e)
            throw new Error("update card error")
        }
    }
export function* gradeCard  (action: ReturnType<typeof gradeCardAC>) {
        try {
            yield put(setAppStatusAC('loading'))
            const Response :AxiosResponse<any> = yield call (CardsAPI.gradeCard, action.grade, action.card_id)
            const newGrade = Response.data.updatedGrade.grade
            yield put(setCardGradeAC(action.card_id, newGrade))
            yield put(setAppStatusAC('succeeded'))
            yield put(setAppErrorAC(null))
        } catch (e) {
            yield call(handleResponseError, e)
        }
    }
export const getCardsAC = () => ({ type: 'CARDS-SAGAS/GET-CARDS' } as const)
export const addCardAC = (cardsPack_id: string, values: { question: string, answer: string }) =>
    ({ type: 'CARDS-SAGAS/ADD-CARD', cardsPack_id, values } as const)
export const removeCardAC = (cardsPack_id: string, cardId: string) =>
    ({ type: 'CARDS-SAGAS/REMOVE-CARD', cardsPack_id, cardId } as const)
export const updateCardAC = (cardId: string, value: valueType) =>
    ({ type: 'CARDS-SAGAS/UPDATE-CARD', cardId, value } as const)
export const gradeCardAC = (grade: number, card_id: string) =>
    ({ type: 'CARDS-SAGAS/GRADE-CARD', grade, card_id } as const)

export function* cardsSaga() {
    yield takeEvery('CARDS-SAGAS/GET-CARDS', getCards)
    yield takeEvery('CARDS-SAGAS/ADD-CARD', addCard)
    yield takeEvery('CARDS-SAGAS/REMOVE-CARD', removeCard)
    yield takeEvery('CARDS-SAGAS/UPDATE-CARD', updateCard)
    yield takeEvery('CARDS-SAGAS/GRADE-CARD', gradeCard)

}
