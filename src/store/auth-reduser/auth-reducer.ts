import { setAppErrorACType, setAppStatusACType } from "../app-reduser/app-reduser";


const initialState = {
    recoveryEmail: false, // если true ссылка для восстановления пароля отправлена
    isRegister: false,    // если true  регистрация прошла успешно успешно
    newPassword: false,   // если true  новый пароль введен успешно
    isLoggedIn: false,    // если true  в данный момент залогинены
}
export type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case "RECOVERY_EMAIL":
            return { ...state, recoveryEmail: action.value }
        case 'SET_IS_REGISTER':
            return { ...state, isRegister: action.value }
        case "APP_SET_PASSWORD":
            return { ...state, newPassword: action.newPassword }
        case "SET_IS_LOGGED_IN":
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}
export const recoveryEmailAC = (value: boolean) => ({ type: 'RECOVERY_EMAIL', value } as const)
export const setIsRegister = (value: boolean) => ({ type: 'SET_IS_REGISTER', value } as const)
export const setIsPasswordAC = (newPassword: boolean) => ({ type: "APP_SET_PASSWORD", newPassword } as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'SET_IS_LOGGED_IN', isLoggedIn } as const)

export type registeredEmailType = {
    email: string
    from: string
    message: string
}
export type RegisterParamsType = {
    email: string
    password: string
}
export type SetPasswordType = {
    password: string
    resetPasswordToken: string
}
export type recoveryEmailACType = ReturnType<typeof recoveryEmailAC>
export type setIsRegisterACType = ReturnType<typeof setIsRegister>
export type setIsPasswordACType = ReturnType<typeof setIsPasswordAC>
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedIn>
type ActionsType = recoveryEmailACType
    | setAppStatusACType
    | setAppErrorACType
    | setIsRegisterACType
    | setIsPasswordACType
    | setIsLoggedInACType
