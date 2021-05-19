import { getMe } from "./auth-sagas";
import { setAppStatusAC, UserDataType } from "../app-reduser/app-reduser";
import { call, put } from "redux-saga/effects";
import { AuthAPI } from "../../api/instance";
import { setResponseData } from "../../utils/HelperFunctions";
import { setIsLoggedIn } from "./auth-reducer";


test('correct getMe saga should be run', () => {
    const gen = getMe()
    const response: UserDataType = {_id:"1",avatar:"",created:null,email:"",
    isAdmin:false,name:"xxxxx",publicCardPacksCount:11,rememberMe:true,updated:null,verified:true}

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(gen.next().value).toEqual(call(AuthAPI.getAuthMe));
    expect(gen.next(response).value).toEqual(call(setResponseData, response, true));
    expect(gen.next().value).toEqual(undefined)
    throw new Error
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')));
    expect(gen.next().value).toEqual(put(setIsLoggedIn(false)));
    expect(gen.next().value).toEqual(undefined)
})
