import React from 'react'
import {Switch, Redirect, Route} from "react-router-dom";
import {Error404} from "../../../n2-features/f4-404/Error404";
import {Home} from "../../../n2-features/f3-Home/Home";
import {Test} from "../../../n2-features/f0-test/test";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {Register} from "../../../n2-features/f1-auth/a2-register/Register";
import {RecoveryPassword} from "../../../n2-features/f1-auth/a3-recoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../n2-features/f1-auth/a4-newPassword/NewPassword";
import {Profile} from "../../../n2-features/f2-profile/Profile";

export const PATH = {
    HOME: "/home",
    TEST: "/test",
    LOGIN: "/login",
    REGISTER: "/register",
    RECOVERY_PASSWORD: "/recovery-password",
    NEW_PASSWORD: "/new-password",
    PROFILE: "/profile",
}

export const Routes = () => {
    return (
        <div>

            <Switch>

                <Route path={"/"} exact render={() => <Redirect to={PATH.HOME}/>}/>
                <Route path={PATH.HOME} render={() => <Home/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPassword/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route render={() => <Error404/>}/>


            </Switch>
        </div>
    )
}