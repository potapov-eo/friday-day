import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { packsReducer } from "./packs-reduser/Packs-reduser";
import { appReducer } from "./app-reduser/app-reduser";
import { cardsReducer } from "./cards-reduser/Cards-reducer";
import { authReducer } from "./auth-reduser/auth-reducer";
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authSaga } from "./auth-reduser/auth-sagas";
import { cardsSaga } from "./cards-reduser/cards-sagas";
import { packsSaga } from "./packs-reduser/packs-sagas";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer

})
const sagaMiddleware = createSagaMiddleware()


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(mySaga)

function* mySaga() {
    yield all([authSaga(), cardsSaga(), packsSaga()])
}

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
