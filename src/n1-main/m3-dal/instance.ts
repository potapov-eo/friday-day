import axios from "axios";
import {DEV_VERSION} from "../../config";
import {RegisterParamsType} from "../../n2-features/f1-auth/a2-register/register-reducer";
import {registeredEmailType} from "../../n2-features/f1-auth/a3-recoveryPassword/recoveryPassword-reducer";
import {SetPasswordType} from "../../n2-features/f1-auth/a4-newPassword/newPassword-reducer";
import {PackType} from "../../n2-features/f5-packs/Packs-reduser";


export const baseURL = !DEV_VERSION
    ? "http://localhost:7542/2.0"
    : "https://neko-back.herokuapp.com/2.0"
export const instance = axios.create({baseURL, withCredentials: true,})


export const AuthAPI = {
    getAuthMe() {
        return instance.post(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/me`)
    }
}

export const RegisterAPI = {
    register(data: RegisterParamsType) {
        return instance.post("/auth/register", data)
    }
}

export const recoveryPasswordAPI = {
    registeredEmail(data: registeredEmailType) {
        return instance.post('/auth/forgot', data)
    },
    setPassword(data: SetPasswordType) {
        return instance.post('/auth/set-new-password', data)
    }
}

export const CardsAPI = {
    getCardPacks(data:getCardPacksDataType) {
        return instance.get(`cards/pack`,{ params: data })
    },

    createCardsPack() {
        return instance.post(`cards/pack`,{  name: "myName"  })
    },
    deleteCardsPack(idCarsPack: string) {
        return instance.delete(`cards/pack/${idCarsPack}`)
    },
    updateCardsPack(cardsPack:cardsPackType ) {
        return instance.put(`cards/pack/`, cardsPack)
    },
   getCards(packId:string) {
        return instance.get(`cards/card/?cardsPack_id=${packId}`)
    }
}
export type cardsPackType = {
    _id:string
    name?:string
}

export type getCardPacksDataType={
    packName?:string
    min?:number
    max?:number
    sortPacks?:string
    page?:number
    pageCount?:number
}
