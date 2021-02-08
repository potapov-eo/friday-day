import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../../n2-features/f1-auth/a1-login/login-reducer";
import {registerReducer} from "../../n2-features/f1-auth/a2-register/register-reducer";
import {recoveryPasswordReducer} from "../../n2-features/f1-auth/a3-recoveryPassword/recoveryPassword-reducer";
import {newPasswordReducer} from "../../n2-features/f1-auth/a4-newPassword/newPassword-reducer";
import {appReducer} from "./app-reduser";


const rootReducer = combineReducers({
    login:loginReducer,
    register:registerReducer,
    recoveryPassword:recoveryPasswordReducer,
    newPassword:newPasswordReducer,
    app:appReducer

})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
