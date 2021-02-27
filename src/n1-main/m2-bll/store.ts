import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {packsReducer} from "../../n2-features/f5-packs/Packs-reduser";
import {appReducer} from "./app-reduser";
import {cardsReducer} from "../../n2-features/f6-cards/Cards-reducer";
import {authReducer} from "../../n2-features/f1-auth/auth-reducer";


const rootReducer = combineReducers({
    auth:authReducer,
    app:appReducer,
    packs:packsReducer,
    cards: cardsReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
