import {AppRootStateType} from "../store";
import {RequestStatusType, UserDataType} from "./app-reduser";

export const selectorStatus = (state:AppRootStateType):RequestStatusType => state.app.status
export const selectorError = (state:AppRootStateType):string|null => state.app.status
export const selectorUserData = (state:AppRootStateType):UserDataType => state.app.UserData
export const selectorUserId =  (state:AppRootStateType):string=> state.app.UserData ? state.app.UserData._id : ""