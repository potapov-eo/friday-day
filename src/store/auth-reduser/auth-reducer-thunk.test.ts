import { registeredEmailType, verificationEmailTC } from './auth-reducer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { instance } from '../../api/instance';
import { handleResponseError, setSuccessfulResponseData } from '../../utils/HelperFunctions';

jest.mock('../../utils/HelperFunctions');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const dispatch = store.dispatch;
const mock = new MockAdapter(instance);


describe(' auth-reducer thunk ', () => {
    beforeEach(() => {
        store.clearActions();
    });

    it('verificationEmailTC with success response ', async () => {
        const mockSetSuccessfulResponseData = setSuccessfulResponseData as jest.MockedFunction<typeof setSuccessfulResponseData>;
        mockSetSuccessfulResponseData.mockImplementation(() => {
            dispatch({ 'type': 'actions from setSuccessfulResponseData' });
        });
        const data: registeredEmailType =
            { email: 'vvv@ccc', from: 'ccc@www', message: 'res' };
        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'RECOVERY_EMAIL', value: true },
            { type: 'actions from setSuccessfulResponseData' },
        ];
        mock.onPost('/auth/forgot').reply(201, { response: { item: 'item1' } });
        const thunk = verificationEmailTC(data);
        await thunk(dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('verificationEmailTC with error response ', async () => {

        const mockHandleResponseError = handleResponseError as jest.MockedFunction<typeof setSuccessfulResponseData>;
        mockHandleResponseError.mockImplementation(() => {
            dispatch({ 'type': 'actions from handleResponseError' });
        });

        const data: registeredEmailType =
            { email: 'vvv@ccc', from: 'ccc@www', message: 'res' };
        let expectedActions = [
            { type: 'SET_APP_STATUS', status: 'loading' },
            { type: 'actions from handleResponseError' },
        ];
        mock.onPost('/auth/forgot').reply(500);
        const thunk = verificationEmailTC(data);
        await thunk(dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    });

});















