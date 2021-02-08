import React, {useEffect} from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RegisterTC, setIsRegister} from "./register-reducer";
import {HashRouter, Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";

export const Register = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    type FormikErrorType = {
        email?: string
        password?: string
    }

    const formik = useFormik({
        initialValues: {
            email: 'potapov.eo@yandex.ru',
            password: 'jekajeka',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password Required';
            } else if (values.password.length < 7) {
                errors.password = 'Invalid email address';
            }
            return errors;
        },


        onSubmit: values => {

            dispatch(RegisterTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {

        return <Redirect to={PATH.PROFILE}/>
    }
    if (isRegister) {

        return <Redirect to={PATH.PROFILE}/>
    }

    return <div>

        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    placeholder={"email"}
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                /> E-mail
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: "red"}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <input
                    placeholder={"password"}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                /> Password
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            </div>
            <button type="submit">Register</button>

        </form>


    </div>
}