import {setIsLoggedIn, setUserData} from "../../n2-features/f1-auth/a1-login/login-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type UserDataType = {
    _id: string | null
    email: string | null,
    name: string | null,
    avatar: string | null,
    publicCardPacksCount: number | null,
    created: Date | null,
    updated: Date | null,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,
} | null
export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    UserData: UserDataType
    isLoggedIn: boolean


}
const initialState: AppInitialStateType = {
    status: 'succeeded',
    error: null,
    UserData: {
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
    },
    isLoggedIn: false

}
export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...(state), status: action.status}
        case 'APP/SET-ERROR':
            return {...(state), error: action.error}
        case "SET_USER_DATA":
            return {...state,UserData:action.userData}
        case "SET_ISLOGGEDIN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)


export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionsType =
    setAppStatusACType
    | setAppErrorACType
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoggedIn>