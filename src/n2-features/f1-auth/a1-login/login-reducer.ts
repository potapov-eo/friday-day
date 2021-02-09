import {Dispatch} from 'redux'
import {AuthAPI} from '../../../n1-main/m3-dal/instance'
import {setAppErrorAC, setAppStatusAC} from "../../../n1-main/m2-bll/app-reduser";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'

const initialState = {}

export const loginReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        default:
            return state
    }
}

//AC
export const setUserData = (_id: string | null, email: string | null, name: string | null, avatar: string | null, publicCardPacksCount: number | null,
                            created: Date | null, updated: Date | null, isAdmin: boolean, verified: boolean, rememberMe: false,) =>
    ({
        type: SET_USER_DATA, data: {
            _id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, rememberMe

        }
    } as const)

export const setIsLoggedIn = (value: boolean) => ({type: SET_ISLOGGEDIN, value} as const)

//TC

export const getMe = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let response = await AuthAPI.getAuthMe()

        let {
            _id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified,
            rememberMe
        } = response.data
        dispatch(setUserData(_id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, rememberMe
        ))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedIn(true))


    } catch (e) {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppErrorAC(error))
    }
}

export const login = (mail: string, password: string, remember_Me: boolean) =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            let response = await AuthAPI.login(mail, password, remember_Me)
            let {
                _id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, rememberMe
            } = response.data
            dispatch(setUserData(_id, email, name, avatar, publicCardPacksCount, created, updated, isAdmin, verified, rememberMe
            ))
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(null))

        } catch (e) {
            dispatch(setAppStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        }
    }

export const logout = () =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'))
            await AuthAPI.logout()
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedIn(false))
            dispatch(setUserData(null, null, null, null, null, null, null, false, false, false))
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
