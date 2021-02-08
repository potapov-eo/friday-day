import axios from "axios";
import {DEV_VERSION} from "../../config";


export const baseURL = !DEV_VERSION
    ? "http://localhost:7542/2.0"
    : "https://neko-back.herokuapp.com/2.0"
export const instance = axios.create({baseURL, withCredentials: true,})


export const AuthAPI = {
    getAuthMe () {
        return instance.post(`auth/me`)
    },
    login (email: string, password:string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout () {
        return instance.delete(`auth/me`)
    }
}

