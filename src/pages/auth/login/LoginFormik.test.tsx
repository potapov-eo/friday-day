import { mount, ReactWrapper } from 'enzyme';
import { Login } from './LoginFormik';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import SuperButton from '../../../components/SuperButton/SuperButton';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    app: { status: 'succeeded' },
    auth: { isLoggedIn: false },
});
const dispatch = store.dispatch;

const setUp = () => mount(<Provider store={store}><Login/> </Provider>);

describe('should render Login component', () => {

    let component: ReactWrapper;
    let instance: React.Component;
    beforeEach(() => {
        component = setUp();
        instance = component.instance();
    });

    it('Login snapshot ', async () => {
        expect(component.find('Login').debug()).toMatchSnapshot();

    });
    it('Login  ', async () => {
        expect(component.find('SuperButton')).toHaveLength(1);
    });
});
it('Login  ', async () => {
    const store = mockStore({
        app: { status: 'loading' },
        auth: { isLoggedIn: false },
    });
    const component= mount(<Provider store={store}><Login/> </Provider>);
     const x = component.find("SuperButton")
    x.simulate('click')

/*    (component.find('SuperButton')).simulate('click')*/
    expect(component.find('div')).toHaveLength(5)
    expect(component.find('SuperButton')).toHaveLength(1)
    console.log(component.debug())
    console.log(x.debug())
});
