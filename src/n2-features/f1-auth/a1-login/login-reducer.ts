import {Dispatch} from 'redux'


const initialState = {
    isLoggedIn: false // проверяем залогинены или нет
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action) {
        case 'SOME_ACTION':

        default:
            return state
    }
}


type ActionsType = {}


