import {
    getMe, login, logout,
    registeredEmailType,
    RegisterParamsType,
    RegisterTC,
    setPasswordTC,
    SetPasswordType,
    verificationEmailTC,
} from './auth-reducer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { instance } from '../../api/instance';


jest.mock('../../utils/HelperFunctions');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const dispatch = store.dispatch;
const mock = new MockAdapter(instance);

beforeEach(() => {
    store.clearActions();

   /* const mockSetSuccessfulResponseData = setSuccessfulResponseData as jest.MockedFunction<typeof setSuccessfulResponseData>;
    mockSetSuccessfulResponseData.mockImplementation(() => {
        dispatch({ 'type': 'actions from setSuccessfulResponseData' }); for example*/
});

const checkFunction = async (thunk: (dispatch: any) => void, expectedActions: any) => {
    await thunk(dispatch);
    expect(store.getActions()).toEqual(expectedActions);
};

describe('verificationEmailTC thunk', () => {

    it('verificationEmailTC with success response ', async () => {

        const data: registeredEmailType =
            { email: 'vvv@ccc', from: 'ccc@www', message: 'res' };
        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'RECOVERY_EMAIL', value: true },
            { type: 'actions from setSuccessfulResponseData' },
        ];
        mock.onPost('/auth/forgot').reply(201, { data: 'mocData' });
        const thunk = verificationEmailTC(data);
        await checkFunction(thunk, expectedActions);
    });
    it('verificationEmailTC with error response ', async () => {

        const data: registeredEmailType =
            { email: 'vvv@ccc', from: 'ccc@www', message: 'res' };
        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onPost('/auth/forgot').reply(500);
        const thunk = verificationEmailTC(data);
        await checkFunction(thunk, expectedActions);
    });
});
describe('RegisterTC thunk', () => {

    it('RegisterTC with success response ', async () => {

        const data: RegisterParamsType =
            { email: 'vvv@ccc', password: 'password' };

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'SET_IS_REGISTER', value: true },
            { type: 'actions from setSuccessfulResponseData' },
        ];
        mock.onPost('/auth/register').reply(201, { data: 'mocData' });
        const thunk = RegisterTC(data);
        await checkFunction(thunk, expectedActions);
    });
    it('RegisterTC with error response ', async () => {

        const data: RegisterParamsType =
            { email: 'vvv@ccc', password: 'password' };

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onPost('/auth/register').reply(500);
        const thunk = RegisterTC(data);
        await checkFunction(thunk, expectedActions);
    });

});
describe('setPasswordTC thunk', () => {

    it('setPasswordTC with success response ', async () => {

        const data: SetPasswordType =
            { password: 'password', resetPasswordToken: 'resetPasswordToken' };

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'APP_SET_PASSWORD', newPassword: true },
            { type: 'actions from setSuccessfulResponseData' },
        ];
        mock.onPost('/auth/set-new-password').reply(201, { data: 'mocData' });
        const thunk = setPasswordTC(data);
        await checkFunction(thunk, expectedActions);
    });
    it('setPasswordTC with error response ', async () => {

        const data: SetPasswordType =
            { password: 'password', resetPasswordToken: 'resetPasswordToken' };

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onPost('/auth/set-new-password').reply(500);
        const thunk = setPasswordTC(data);
        await checkFunction(thunk, expectedActions);
    });

});
describe('getMe thunk', () => {

    it('getMe with success response ', async () => {

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from setResponseData' },
        ];
        mock.onPost('auth/me').reply(201, {});
        const thunk = getMe();
        await checkFunction(thunk, expectedActions);
    });
    it('getMe with error response ', async () => {


        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'SET_APP_STATUS', status: 'failed' },
            { type: 'SET_IS_LOGGED_IN', isLoggedIn: false },
        ];
        mock.onPost('auth/me').reply(500);
        const thunk = getMe();
        await checkFunction(thunk, expectedActions);
    });

});
describe('login thunk', () => {

    it('login with success response ', async () => {

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from setResponseData' },
        ];
        mock.onPost('auth/login').reply(201, { data: 'mocData' });
        const thunk = login('mail',  'password',true);
        await checkFunction(thunk, expectedActions);
    });
    it('login with error response ', async () => {

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onPost('auth/login').reply(500);
        const thunk =  login('mail',  'password',true);
        await checkFunction(thunk, expectedActions);
    });

});

describe('logout thunk', () => {

    it('logout with success response ', async () => {

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from setResponseData' },
            {type: 'SET_CARD_PACKS', cardPacks:[]},
            {type: 'SET_CARDS', cards:[]}
        ];
        mock.onDelete('auth/me').reply(201, { data: 'mocData' });
        const thunk = logout();
        await checkFunction(thunk, expectedActions);
    });
    it('logout with error response ', async () => {

        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onDelete('auth/me').reply(500);
        const thunk =  logout();
        await checkFunction(thunk, expectedActions);
    });

});











