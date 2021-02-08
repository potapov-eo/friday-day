import axios from "axios";
import {DEV_VERSION} from "../../config";
import {RegisterParamsType} from "../../n2-features/f1-auth/a2-register/register-reducer";

export const baseURL = !DEV_VERSION
    ? "http://localhost:7542/2.0"
    : "https://neko-back.herokuapp.com/2.0"
export const instance = axios.create({baseURL})

export const RegisterAPI = {
    register(data:RegisterParamsType){
        return instance.post("/auth/register" , data)
    }
}