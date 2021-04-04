import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: AppInitialStateType = {
    status: 'succeeded',
    error: null,
    UserData: {
        _id: "",
        email: null as string | null,
        name: null as string | null,
        avatar: null as string | null,
        publicCardPacksCount: null as number | null,
        created: null as Date | null,
        updated: null as Date | null,
        isAdmin: false,
        verified: false, //
        rememberMe: false,
    }
}
 const appSlice = createSlice({
    name: "app",
    initialState,
    reducers:{
        setAppStatusAC(state, action: PayloadAction<RequestStatusType>){
            state.status = action.payload
        },
        setAppErrorAC(state, action: PayloadAction<string|null>){
            state.error = action.payload
        },
        setUserDataAC(state, action: PayloadAction<UserDataType>){
            state.UserData = action.payload
        },
        setPublicCardPacksCountAC(state, action: PayloadAction<number>){
            state.UserData?state.UserData.publicCardPacksCount = action.payload:state=state
        },

    }
})
export const { setAppStatusAC, setAppErrorAC, setUserDataAC , setPublicCardPacksCountAC} = appSlice.actions

export type UserDataType = {
    _id: string
    email: string | null,
    name: string | null,
    avatar: string | null,
    publicCardPacksCount: number | null,
    created: Date | null,
    updated: Date | null,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
} | null

export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    UserData: UserDataType
    userId?: string
}

export const appReducer =  appSlice.reducer

/*export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'SET_APP_STATUS':
            return {...state, status: action.status}
        case 'SET_APP_ERROR':
            return {...state, error: action.error}
        case "SET_USER_DATA":
            return {...state, UserData: action.userData}
        case "SET_CARDS_PACK_TOTAL_COUNT":
            if (state.UserData) {
                return {
                    ...state, UserData: {
                        ...state.UserData, publicCardPacksCount: action.publicCardPacksCount
                    }
                }
            } else return state
        default:
            return state
    }

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'SET_APP_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) =>
    ({type: 'SET_APP_ERROR', error} as const)
export const setUserDataAC = (userData: UserDataType) => ({type: 'SET_USER_DATA', userData} as const)
export const setPublicCardPacksCountAC = (publicCardPacksCount: number | null) =>
    ({type: 'SET_CARDS_PACK_TOTAL_COUNT', publicCardPacksCount} as const)


export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setUserDataACType = ReturnType<typeof setUserDataAC>
export type setPublicCardPacksCountACType = ReturnType<typeof setPublicCardPacksCountAC>*/






