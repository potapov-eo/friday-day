import { Dispatch } from 'redux';
import { setAppErrorACType, setAppStatusAC, setAppStatusACType, UserDataType } from '../app-reduser/app-reduser';
import { AuthAPI, recoveryPasswordAPI, RegisterAPI } from '../../api/instance';
import {
    getResponseError,
    handleResponseError,
    setResponseData,
    setSuccessfulResponseData,
} from '../../utils/HelperFunctions';
import { setCardPacksAC } from '../packs-reduser/Packs-reduser';
import { setCardsAC } from '../cards-reduser/Cards-reducer';
import { AxiosResponse } from 'axios';


const initialState = {
    recoveryEmail: false, // если true ссылка для восстановления пароля отправлена
    isRegister: false,    // если true  регистрация прошла успешно успешно
    newPassword: false,   // если true  новый пароль введен успешно
    isLoggedIn: false,    // если true  в данный момент залогинены
};
export type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'RECOVERY_EMAIL':
            return { ...state, recoveryEmail: action.value };
        case 'SET_IS_REGISTER':
            return { ...state, isRegister: action.value };
        case 'APP_SET_PASSWORD':
            return { ...state, newPassword: action.newPassword };
        case 'SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.isLoggedIn };
        default:
            return state;
    }
};
export const recoveryEmailAC = (value: boolean) => ({ type: 'RECOVERY_EMAIL', value } as const);
export const setIsRegister = (value: boolean) => ({ type: 'SET_IS_REGISTER', value } as const);
export const setPasswordAC = (newPassword: boolean) => ({ type: 'APP_SET_PASSWORD', newPassword } as const);
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'SET_IS_LOGGED_IN', isLoggedIn } as const);


export const verificationEmailTC = (data: registeredEmailType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        const x = await recoveryPasswordAPI.registeredEmail(data);
        dispatch(recoveryEmailAC(true));
        setSuccessfulResponseData(dispatch);
    } catch (e) {
        handleResponseError(e, dispatch);
    }
};

export const RegisterTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        await RegisterAPI.register(data);
        dispatch(setIsRegister(true));
        setSuccessfulResponseData(dispatch);
    } catch (e) {
        handleResponseError(e, dispatch);
    }
};
export const setPasswordTC = (data: SetPasswordType) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'));
            await recoveryPasswordAPI.setPassword(data);
            dispatch(setPasswordAC(true));
            setSuccessfulResponseData(dispatch);

        } catch (e) {
            handleResponseError(e, dispatch);
        }
    };
export const getMe = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        let response = <AxiosResponse<UserDataType>>await AuthAPI.getAuthMe();
        setResponseData(dispatch, response.data, true);
    } catch (e) {
        dispatch(setAppStatusAC('failed'));
        const error = getResponseError(e);
        console.log(error);
        dispatch(setIsLoggedIn(false));
    }
};
export const login = (mail: string, password: string, remember_Me: boolean) =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'));
            let response = <AxiosResponse<UserDataType>>await AuthAPI.login(mail, password, remember_Me);
            setResponseData(dispatch, response.data, true);
        } catch (e) {
            handleResponseError(e, dispatch);
        }
    };

export const logout = () =>
    async (dispatch: any) => {
        try {
            dispatch(setAppStatusAC('loading'));
            await AuthAPI.logout();
            setResponseData(dispatch, null, false);
            dispatch(setCardPacksAC([]));
            dispatch(setCardsAC([]));
        } catch (e) {
            debugger
            handleResponseError(e, dispatch);
        }

    };
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
export type setPasswordACType = ReturnType<typeof setPasswordAC>
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedIn>
type ActionsType = recoveryEmailACType
    | setAppStatusACType
    | setAppErrorACType
    | setIsRegisterACType
    | setPasswordACType
    | setIsLoggedInACType
