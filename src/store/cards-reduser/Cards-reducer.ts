const initialState = {
    cards: [] as Array<CardType>,
    paginationCards: {
        page: 1,
        pageCount: 3,
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 6,
        sortCards: ''
    },
    totalCardsCount: 0
}

export type cardsReducerInitialStateType = typeof initialState

export const cardsReducer = (state: cardsReducerInitialStateType = initialState, action: ActionsType): cardsReducerInitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return { ...state, cards: action.cards }
        case "SET_TOTAL_CARDS_COUNT":
            return { ...state, totalCardsCount: action.packsCount }
        case 'SET_PAGINATION_CARD_PROPERTY':
            return { ...state, paginationCards: { ...state.paginationCards, ...action.property } }
        case 'SET_CARD_GRADE':
            const newCards = state.cards.map((card) => card._id === action.card_id ? {
                ...card,
                grade: action.grade
            } : card)
            return { ...state, cards: newCards }

        default:
            return state
    }
}

//AC

export const setCardsAC = (cards: Array<CardType>) => ({ type: 'SET_CARDS', cards } as const)
export const setTotalCardsCountAC = (packsCount: number) => ({ type: "SET_TOTAL_CARDS_COUNT", packsCount } as const)
export const setPaginationCardAC = (property: setPaginationCardType) =>
    ({ type: 'SET_PAGINATION_CARD_PROPERTY', property } as const)
export const setCardGradeAC = (card_id: string, grade: number) => ({ type: "SET_CARD_GRADE", card_id, grade } as const)


type ActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setPaginationCardAC>
    | ReturnType<typeof setCardGradeAC>

export type GetCardsResponseType = {
    cards: Array<CardType>
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    token: string
    tokenDeathTime: Date
}
export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    questionImg: string
    questionVideo: string
}
export type setPaginationCardType =
    { page: number }
    | { pageCount: number }
    | { cardAnswer: string }
    | { cardQuestion: string }
    | { cardsPack_id: string }
    | { min: number }
    | { max: number }
    | { sortCards: string }
export type paginationCardsType = {
    page: number
    pageCount: number,
    cardAnswer: string,
    cardQuestion: string,
    cardsPack_id: string,
    min: number,
    max: number,
    sortCards: string
}
