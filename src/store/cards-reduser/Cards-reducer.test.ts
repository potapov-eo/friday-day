import {
    cardsReducer,
    cardsReducerInitialStateType,
    CardType, setCardGradeAC,
    setCardsAC,
    setPaginationCardAC,
    setTotalCardsCountAC
} from "./Cards-reducer";

let startState: cardsReducerInitialStateType

const initPagination = {
    page: 1,
    pageCount: 3,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 6,
    sortCards: ''
}
const initCardPacks = [{
    _id: "23",
    cardsPack_id: "string",
    user_id: "string",
    answer: "string",
    question: "string",
    grade: 1,
    shots: 1,
    comments: "string",
    type: "string",
    rating: 4,
    more_id: "string",
    created: "string",
    updated: "string",
    __v: 444,
    answerImg: "string",
    questionImg: "string",
    questionVideo: "string",

}]
beforeEach(() => {
    startState = {
        cards:initCardPacks,
        paginationCards: initPagination,
        totalCardsCount: 0
    }

});

test('correct Cards should be added', () => {
    const cardPacks = [{
        _id: "string",
        cardsPack_id: "string",
        user_id: "string",
        answer: "string",
        question: "string",
        grade: 1,
        shots: 1,
        comments: "string",
        type: "string",
        rating: 4,
        more_id: "string",
        created: "string",
        updated: "string",
        __v: 444,
        answerImg: "string",
        questionImg: "string",
        questionVideo: "string",

    }]

    const action = setCardsAC(cardPacks);

    const endState = cardsReducer(startState, action)

    expect(endState).toEqual({
        cards: cardPacks,
        paginationCards: initPagination,
        totalCardsCount: 0

    });
})
test('correct Total cards count should be added', () => {


    const action = setTotalCardsCountAC(23);

    const endState = cardsReducer(startState, action)

    expect(endState).toEqual({
        cards:initCardPacks,
        paginationCards: initPagination,
        totalCardsCount: 23
    });
})
test('correct pagination property should be added', () => {


    const action1 = setPaginationCardAC({page: 5});
    const action2 = setPaginationCardAC({cardAnswer: 'Jon?'});

    const endState1 = cardsReducer(startState, action1)
    const endState2 = cardsReducer(startState, action2)

    expect(endState1.paginationCards.page).toBe(5);
    expect(endState2.paginationCards.cardAnswer).toBe('Jon?');
})
test('correct card grade should be added', () => {


    const action = setCardGradeAC({card_id:"23", grade :4});

    const endState = cardsReducer(startState, action)

    expect(endState.cards[0].grade).toBe(4);

})