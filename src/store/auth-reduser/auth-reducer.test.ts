import {
    AuthInitialStateType,
    authReducer, init,
    recoveryEmailAC,
    setIsLoggedIn,
    setIsRegister,
    setPasswordAC,
} from './auth-reducer';

let startState: AuthInitialStateType;


describe('auth-reducer thunk test', () => {
    beforeEach(() => {
        startState = {
            recoveryEmail: false, // если true ссылка для восстановления пароля отправлена
            isRegister: false,    // если true  регистрация прошла успешно успешно
            newPassword: false,   // если true  новый пароль введен успешно
            isLoggedIn: false,
        };

    });

    it('correct recoveryEmail should be added', () => {
        const action = recoveryEmailAC(true);

        const endState = authReducer(startState, action);

        expect(endState).toEqual({
            recoveryEmail: true,
            isRegister: false,
            newPassword: false,
            isLoggedIn: false,
        });
    });
    it('correct isRegister should be added', () => {
        const action = setIsRegister(true);

        const endState = authReducer(startState, action);

        expect(endState).toEqual({
            recoveryEmail: false,
            isRegister: true,
            newPassword: false,
            isLoggedIn: false,
        });
    });
    it('correct newPassword should be added', () => {
        const action = setPasswordAC(true);

        const endState = authReducer(startState, action);

        expect(endState).toEqual({
            recoveryEmail: false,
            isRegister: false,
            newPassword: true,
            isLoggedIn: false,
        });
    });
    it('correct isLoggedIn should be added', () => {
        const action = setIsLoggedIn(true);

        const endState = authReducer(startState, action);

        expect(endState).toEqual({
            recoveryEmail: false,
            isRegister: false,
            newPassword: false,
            isLoggedIn: true,
        });
    });
    it('correct work with initial action ', () => {
        const action = init();
        const endState = authReducer(startState, action);
        expect(endState).toEqual(startState);
    });
});







