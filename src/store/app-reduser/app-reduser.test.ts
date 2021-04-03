import {
    AppInitialStateType,
    appReducer,
    setAppErrorAC,
    setAppStatusAC,
    setPublicCardPacksCountAC,
    setUserDataAC
} from "./app-reduser";


let startState: AppInitialStateType
const initUserData = {
    _id: "",
    email: "",
    name: "",
    avatar: null,
    publicCardPacksCount: 0,
    created: null,
    updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
}

beforeEach(() => {
    startState = {
        status: 'succeeded',
        error: null,
        UserData: initUserData,
    }

});

test('correct status should be added', () => {
    const action = setAppStatusAC('idle');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'idle',
        error: null,
        UserData: initUserData,
          });
})
test('correct error should be added', () => {
    const action = setAppErrorAC('errors');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: "errors",
        UserData: initUserData,
    });
})
test('correct User Data should be added', () => {

    const UserData = {
        _id: "4111111111",
        email: "potapov@yandex.ru",
        name: "Jeka",
        avatar: null,
        publicCardPacksCount: 777,
        created: null as Date | null,
        updated: null as Date | null,
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
    }
    const action = setUserDataAC(UserData)

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: null,
        UserData: {
            _id: "4111111111",
            email: "potapov@yandex.ru",
            name: "Jeka",
            avatar: null,
            publicCardPacksCount: 777,
            created: null as Date | null,
            updated: null as Date | null,
            isAdmin: false,
            verified: false, // подтвердил ли почту
            rememberMe: false,
        },
    });
})
test('correct publicCardPacksCount Data should be added', () => {

    const publicCardPacksCount = 17
    const action = setPublicCardPacksCountAC(publicCardPacksCount)

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: null,
        UserData: {
            _id: "",
            email: "",
            name: "",
            avatar: null,
            publicCardPacksCount: 17,
            created: null,
            updated: null,
            isAdmin: false,
            verified: false, // подтвердил ли почту
            rememberMe: false,
        },
    });
})
