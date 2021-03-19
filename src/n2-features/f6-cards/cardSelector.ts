import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {CardType, paginationCardsType} from "./Cards-reducer";


export const selectorCards = (state: AppRootStateType): Array<CardType> => state.cards.cards
export const selectorTotalCardsCount = (state: AppRootStateType): number => state.cards.totalCardsCount
export const selectorPaginationCards = (state: AppRootStateType): paginationCardsType => state.cards.paginationCards