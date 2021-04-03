import {
    packsReducer,
    packsReducerInitialStateType,
    PackType,
    setCardPacksAC,
    setPaginationAC,
    setTotalPacksCountAC
} from "./Packs-reduser";

let startState: packsReducerInitialStateType

const initPagination =  {
    packName: "",//совпадение по имени
    min: 0,
    max: 0,//количество карточек в колоде
    sortPacks: "0updated",// сортировка
    page: 1, //номер страницы
    pageCount: 3,//кол-во элем на странице
    user_id: "",

}
beforeEach(() => {
    startState = {
        cardPacks: [] as Array<PackType>,
        pagination:initPagination,
        totalPacksCount: 0  //кол-во колод
    }

});

test('correct cardPacks should be added', () => {
    const cardPacks = [{
        _id: "546464456",
        user_id: "1645646546",
        user_name: "string",
        private: false,
        name: "packName",
    }, {
        _id: "546464456",
        user_id: "1645646546",
        user_name: "string",
        private: false,
        name: "packName",
    }]

    const action = setCardPacksAC(cardPacks);

    const endState = packsReducer(startState, action)

    expect(endState).toEqual({
        cardPacks: cardPacks,
        pagination:initPagination,
        totalPacksCount: 0
    });
})
test('correct PAGINATION_PROPERTY should be added', () => {

const property1 = {sortPacks: "1updated"}
const property2 = {pageCount: 8}

const action1 = setPaginationAC(property1);
const action2 = setPaginationAC(property2);

    const endState1 = packsReducer(startState, action1)
    const endState2 = packsReducer(startState, action2)

    expect(endState1.pagination.sortPacks).toBe("1updated");
    expect(endState2.pagination.pageCount).toBe(8);
})
test('correct totalPacksCount should be added', () => {

        const action = setTotalPacksCountAC(23);

    const endState = packsReducer(startState, action)

    expect(endState).toEqual({
        cardPacks: [] as Array<PackType>,
        pagination:initPagination,
        totalPacksCount: 23
    });
})