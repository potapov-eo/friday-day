import {Dispatch} from 'redux'
import {AuthAPI} from '../../../n1-main/m3-dal/instance'
import {setAppErrorAC} from "../../../n1-main/m2-bll/app-reduser";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'

const initialState = {
    _id: null as string | null,
    email: null as string | null,
    name: null as string | null,
    avatar: null as string | null,
    publicCardPacksCount: null as number | null,
    created: null as Date | null,
    updated: null as Date | null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: null as string | null,
    isLoggedIn: false
}

export const loginReducer = (state= initialState, action: ActionsType): InitialStateType => {
    
    switch (action.type) {
        
        case SET_USER_DATA: 
           return { ...state, ...action.data }   
        case SET_ISLOGGEDIN: 
           return { ...state, isLoggedIn: action.value}  
        default: return state
    }
}

//AC
export const setUserData = ( _id: string | null, email:string | null, name:string | null, avatar: string | null, publicCardPacksCount: number | null,
    created: Date | null, updated: Date | null, isAdmin: boolean, verified: boolean, rememberMe: boolean, error: string | null) =>
    ({type: SET_USER_DATA, data: {_id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, 
    rememberMe, error }}as const)

export const setIsLoggedIn = (value: boolean) => ({type: SET_ISLOGGEDIN, value} as const)

//TC

export const getMe = () => async (dispatch: Dispatch) => {
    try {
        let response = await AuthAPI.getAuthMe()
        if (response.data.resultCode === 0) {
            let { _id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, 
                rememberMe, error } = response.data.data
            dispatch(setUserData(_id, email, name, avatar, publicCardPacksCount, created, updated, true, verified, 
                rememberMe, error))
        }
    } catch (e) {
        const error = e.response 
        ? e.response.data.error 
        : (e.message + ', more details in the console')
    }
}

export const login = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: any) => {
        try {
            await AuthAPI.login(email, password, rememberMe)
                dispatch(getMe())
                dispatch(setIsLoggedIn(true))

        } catch (e) {
            const error = e.response 
            ? e.response.data.error 
            : (e.message + ', more details in the console')
        }
    }

export const logout = () =>
    async (dispatch: any) => {
        try {
            const response = await AuthAPI.logout()
            dispatch(setIsLoggedIn(false))
                dispatch(setUserData(null, null, null, null, null, null, null,false, false, false, null))
            dispatch(setAppErrorAC(null))
        } catch (e) {
            const error = e.response 
            ? e.response.data.error 
            : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        }

    }

//types
    type ActionsType = | ReturnType<typeof setUserData> | ReturnType<typeof setIsLoggedIn> 
    type InitialStateType = typeof initialState
