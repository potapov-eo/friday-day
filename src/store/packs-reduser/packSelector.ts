import {AppRootStateType} from "../store";
import {PackType, paginationType} from "./Packs-reduser";

export const selectorCardPacks = (state:AppRootStateType):Array<PackType> => state.packs.cardPacks
export const selectorTotalPacksCount = (state:AppRootStateType):number => state.packs.totalPacksCount
export const selectorPagination = (state:AppRootStateType):paginationType => state.packs.pagination

