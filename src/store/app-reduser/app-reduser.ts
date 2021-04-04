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
    reducers: {
        setAppStatusAC(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setAppErrorAC(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setUserDataAC(state, action: PayloadAction<UserDataType>) {
            state.UserData = action.payload
        },
        setPublicCardPacksCountAC(state, action: PayloadAction<number>) {
            state.UserData ? state.UserData.publicCardPacksCount = action.payload : state = {...state}
        },

    }
})
export const {setAppStatusAC, setAppErrorAC, setUserDataAC, setPublicCardPacksCountAC} = appSlice.actions

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

export const appReducer = appSlice.reducer






