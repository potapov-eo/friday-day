import React, {useState} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {Error404} from "../pages/404/Error404";
import {Test} from "../pages/test/test";
import {Login} from "../pages/auth/login/LoginFormik";
import {Register} from "../pages/auth/register/Register";
import {RecoveryPassword} from "../pages/auth/recoveryPassword/RecoveryPassword";
import {Profile} from "../pages/profile/Profile";
import {NewPassword} from "../pages/auth/newPassword/NewPassword";
import { Packs } from '../pages/packs/Packs';
import {Cards} from "../pages/cards/Cards";
import {Learn} from "../pages/learn/Learn";


export const PATH = {
    HOME: "/home",
    TEST: "/test",
    LOGIN: "/login",
    REGISTER: "/register",
    RECOVERY_PASSWORD: "/recovery-password",
    NEW_PASSWORD: "/new-password",
    PROFILE: "/profile",
    PACK: "/packs",
    CARDS: "/cards",
    LEARN:"/learn"
}

export const Routes = () => {
    let [activeModal, setActiveModal] = useState<boolean>(false) 
    return (
        <div>

            <Switch>

                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={`${PATH.NEW_PASSWORD}/:token`} render={() => <NewPassword/> }/>
                <Route path={PATH.NEW_PASSWORD} exact render={ () => <RecoveryPassword/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACK} render={() => <Packs activeModal={activeModal} setActiveModal={setActiveModal}/>}/>
                <Route path={`${PATH.CARDS}/:token`} render={() => <Cards/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={`${PATH.LEARN}/:token`} render={() => <Learn/>}/>
                <Route path={PATH.LEARN} render={() => <Learn/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )
}