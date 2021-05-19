import {
    getMe,
    login,
    loginAC,
    logout,
    Register,
    registerAC, setPassword, setPasswordAC,
    verificationEmail,
    verificationEmailAC
} from "./auth-sagas";
import { setAppStatusAC, UserDataType } from "../app-reduser/app-reduser";
import { call, put } from "redux-saga/effects";
import { AuthAPI, recoveryPasswordAPI, RegisterAPI } from "../../api/instance";
import { handleResponseError, setResponseData, setSuccessfulResponseData } from "../../utils/HelperFunctions";
import { recoveryEmailAC, setIsLoggedIn, setIsPasswordAC, setIsRegister } from "./auth-reducer";
import { setCardPacksAC } from "../packs-reduser/Packs-reduser";
import { setCardsAC } from "../cards-reduser/Cards-reducer";

const response: UserDataType = {
    _id: "1", avatar: "", created: null, email: "",
    isAdmin: false, name: "xxxxx", publicCardPacksCount: 11, rememberMe: true, updated: null, verified: true
}
test('the getMe saga should work correctly', () => {
    const genGetMe = getMe()

    expect(genGetMe.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genGetMe.next().value).toEqual(call(AuthAPI.getAuthMe));
    expect(genGetMe.next(response).value).toEqual(call(setResponseData, response, true));
    const e = "Error"
    expect(genGetMe.throw(e).value).toEqual(put(setAppStatusAC('failed')));
    expect(genGetMe.next().value).toEqual(put(setIsLoggedIn(false)));
    expect(genGetMe.next().value).toEqual(undefined)
})
test('the login saga should work correctly', () => {
    const action: ReturnType<typeof loginAC> = {
        type: "AUTH-SAGAS/LOGIN",
        mail: "ss",
        password: "ss",
        remember_Me: true
    }
    const genLogin = login(action)
    expect(genLogin.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genLogin.next().value).toEqual(call(AuthAPI.login, action.mail, action.password, action.remember_Me));
    expect(genLogin.next(response).value).toEqual(call(setResponseData, response, true));
    const e = "Error"
    expect(genLogin.throw(e).value).toEqual(call(handleResponseError, e))
    expect(genLogin.next().value).toEqual(undefined)
})
test('the Logout saga should work correctly', () => {
    const genLogout = logout()
    expect(genLogout.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genLogout.next().value).toEqual(call(AuthAPI.logout));
    expect(genLogout.next().value).toEqual(call(setResponseData, null, false));
    expect(genLogout.next().value).toEqual(put(setCardPacksAC([])))
    expect(genLogout.next().value).toEqual(put(setCardsAC([])))
    const e = "Error"
    expect(genLogout.throw(e).value).toEqual(call(handleResponseError, e))
    expect(genLogout.next().value).toEqual(undefined)
})
test('the verificationEmail saga should work correctly', () => {
    const action: ReturnType<typeof verificationEmailAC> = {
        type: "AUTH-SAGAS/VERIFICATION-EMAIL",
        data: { email: 'ccc', from: "sss", message: "sssss" }
    }
    const genVerificationEmail = verificationEmail(action)
    expect(genVerificationEmail.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genVerificationEmail.next().value).toEqual(call(recoveryPasswordAPI.registeredEmail, action.data));
    expect(genVerificationEmail.next().value).toEqual(put(recoveryEmailAC(true)));
    expect(genVerificationEmail.next().value).toEqual(call(setSuccessfulResponseData));
    const e = "Error"
    expect(genVerificationEmail.throw(e).value).toEqual(call(handleResponseError, e))
    expect(genVerificationEmail.next().value).toEqual(undefined)
})
test('the Register saga should work correctly', () => {
    const action: ReturnType<typeof registerAC> = {
        type: "AUTH-SAGAS/REGISTER",
        data: { password: "1111", email: "2222" }
    }
    const genRegister = Register(action)
    expect(genRegister.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genRegister.next().value).toEqual(call(RegisterAPI.register, action.data));
    expect(genRegister.next().value).toEqual(put(setIsRegister(true)));
    expect(genRegister.next().value).toEqual(call(setSuccessfulResponseData));
    const e = "Error"
    expect(genRegister.throw(e).value).toEqual(call(handleResponseError, e))
    expect(genRegister.next().value).toEqual(undefined)
})
test('the setPassword saga should work correctly', () => {
    const action: ReturnType<typeof setPasswordAC> = {
        type: "AUTH-SAGAS/SET-PASSWORD",
        data: { password: "1111", resetPasswordToken: "vvv" }
    }
    const genSetPassword = setPassword(action)
    expect(genSetPassword.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genSetPassword.next().value).toEqual(call(recoveryPasswordAPI.setPassword, action.data));
    expect(genSetPassword.next().value).toEqual(put(setIsPasswordAC(true)));
    expect(genSetPassword.next().value).toEqual(call(setSuccessfulResponseData));
    const e = "Error"
    expect(genSetPassword.throw(e).value).toEqual(call(handleResponseError, e))
    expect(genSetPassword.next().value).toEqual(undefined)
})
