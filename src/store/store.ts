import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {packsReducer} from "./packs-reduser/Packs-reduser";
import {appReducer} from "./app-reduser/app-reduser";
import {cardsReducer} from "./cards-reduser/Cards-reducer";
import {authReducer} from "./auth-reduser/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth:authReducer,
    app:appReducer,
    packs:packsReducer,
    cards: cardsReducer

})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)); old
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware()
})//new (getDefaultMiddleware().prepend(thunkMiddleware)) recommends Dimych


export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
