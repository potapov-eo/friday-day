import { Dispatch } from 'redux'

export const setSuccessfulResponseData = (dispatch: Dispatch<any>) => {
    dispatch({ 'type': 'actions from setSuccessfulResponseData' });
};
export const handleResponseError = (e:any, dispatch: Dispatch<any> ) => {
    dispatch({ 'type': 'actions from handleResponseError' });
};
export const setResponseData = (dispatch: Dispatch<any>) => {
    dispatch({ 'type': 'actions from setResponseData' });
};
export const getResponseError = (e:any) =>"string from getResponseError"

