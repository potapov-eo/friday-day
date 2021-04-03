import {
    AuthInitialStateType,
    authReducer,
    recoveryEmailAC,
    setIsLoggedIn,
    setIsRegister,
    setPasswordAC
} from "./auth-reducer";

let startState: AuthInitialStateType


beforeEach(() => {
    startState = {
        recoveryEmail: false, // если true ссылка для восстановления пароля отправлена
        isRegister: false,    // если true  регистрация прошла успешно успешно
        newPassword: false,   // если true  новый пароль введен успешно
        isLoggedIn: false,
    }

});

test('correct recoveryEmail should be added', () => {
    const action = recoveryEmailAC(true);

    const endState = authReducer(startState, action)

    expect(endState).toEqual({
        recoveryEmail: true,
        isRegister: false,
        newPassword: false,
        isLoggedIn: false,
    });
})
test('correct isRegister should be added', () => {
    const action = setIsRegister(true);

    const endState = authReducer(startState, action)

    expect(endState).toEqual({
        recoveryEmail: false,
        isRegister: true,
        newPassword: false,
        isLoggedIn: false,
    });
})
test('correct newPassword should be added', () => {
    const action = setPasswordAC(true);

    const endState = authReducer(startState, action)

    expect(endState).toEqual({
        recoveryEmail: false,
        isRegister: false,
        newPassword: true,
        isLoggedIn: false,
    });
})
test('correct isLoggedIn should be added', () => {
    const action = setIsLoggedIn(true);

    const endState = authReducer(startState, action)

    expect(endState).toEqual({
        recoveryEmail: false,
        isRegister: false,
        newPassword: false,
        isLoggedIn: true,
    });
})