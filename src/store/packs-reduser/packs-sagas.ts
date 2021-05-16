import { setAppStatusAC, setPublicCardPacksCountAC } from "../app-reduser/app-reduser";
import { handleResponseError, helperGetCardPacks, setSuccessfulResponseData } from "../../utils/HelperFunctions";
import { setIsLoggedIn } from "../auth-reduser/auth-reducer";
import { CardsAPI } from "../../api/instance";
import { setPaginationAC, setTotalPacksCountAC } from "./Packs-reduser";
import { call, put, select, takeEvery } from "redux-saga/effects";

export function* getCardPacks() {
    try {
        yield put(setAppStatusAC('loading'))
        const response = yield call(helperGetCardPacks)
        const state = yield select()
        const currentPage = state.packs.pagination.page
        if (currentPage) yield put(setPaginationAC({ page: currentPage }))
        yield put(setTotalPacksCountAC(response.data.cardPacksTotalCount))
        yield call(setSuccessfulResponseData)
        yield put(setIsLoggedIn(true))
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* addCardPack(action: ReturnType<typeof addCardPackAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(CardsAPI.createCardsPack, action.newPackName)
        const response = yield call(helperGetCardPacks)
        yield put(setPublicCardPacksCountAC(response.data.cardPacksTotalCount))
        yield call(setSuccessfulResponseData)
        yield put(setTotalPacksCountAC(response.data.cardPacksTotalCount))
    } catch (e) {
        yield call(handleResponseError, e)
        throw new Error("add cardPack error")
    }
}

export function* removePack(action: ReturnType<typeof removePackAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(CardsAPI.deleteCardsPack, action.idCarsPack)
        const response = yield call(helperGetCardPacks)
        yield put(setPublicCardPacksCountAC(response.data.cardPacksTotalCount))
        yield call(setSuccessfulResponseData)
        yield put(setTotalPacksCountAC(response.data.cardPacksTotalCount))
    } catch (e) {
        yield call(handleResponseError, e)
    }
}

export function* updatePackName(action: ReturnType<typeof updatePackNameAC>) {
    try {
        yield put(setAppStatusAC('loading'))
        yield call(CardsAPI.updateCardsPack, action.id, action.newNamePack)
        yield call(helperGetCardPacks)
        yield call(setSuccessfulResponseData)
    } catch (e) {
        yield call(handleResponseError, e)
        throw new Error("update cardPack error")
    }
}

export const getCardPacksAC = () => ({ type: 'PACKS-SAGAS/GET-CARD-PACKS' } as const)
export const addCardPackAC = (newPackName: string) =>
    ({ type: 'PACKS-SAGAS/ADD-CARD-PACK', newPackName } as const)
export const removePackAC = (idCarsPack: string) =>
    ({ type: 'PACKS-SAGAS/REMOVE-PACK', idCarsPack } as const)
export const updatePackNameAC = (id: string, newNamePack: string) =>
    ({ type: 'PACKS-SAGAS/UPDATE-PACK-NAME', id, newNamePack } as const)


export function* packsSaga() {
    yield takeEvery('PACKS-SAGAS/GET-CARD-PACKS', getCardPacks)
    yield takeEvery('PACKS-SAGAS/ADD-CARD-PACK', addCardPack)
    yield takeEvery('PACKS-SAGAS/REMOVE-PACK', removePack)
    yield takeEvery('PACKS-SAGAS/UPDATE-PACK-NAME', updatePackName)

}
