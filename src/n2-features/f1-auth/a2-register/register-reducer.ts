import {Dispatch} from 'redux'


const initialState = {

}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action) {
        case 'SOME_ACTION':

        default:
            return state
    }
}


type ActionsType = {}