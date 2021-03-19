import {AppRootStateType} from "../../n1-main/m2-bll/store";

export const selectorRecoveryEmail = (state:AppRootStateType):boolean => state.auth.recoveryEmail
export const selectorIsRegister = (state:AppRootStateType):boolean => state.auth.isRegister
export const selectorNewPassword = (state:AppRootStateType):boolean => state.auth.newPassword
export const selectorIsLoggedIn = (state:AppRootStateType):boolean => state.auth.isLoggedIn