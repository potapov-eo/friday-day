import React from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../routes/Routes";
import SuperButton from "../../../components/SuperButton/SuperButton";
import SuperInput from "../../../components/SuperInput/SuperInput";
import {RegisterTC} from "../../../store/auth-reduser/auth-reducer";
import {selectorIsLoggedIn, selectorIsRegister} from "../../../store/auth-reduser/authSelector";
import {selectorStatus} from "../../../store/app-reduser/appSelector";

export const Register = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectorStatus)
    const isLoggedIn = useSelector(selectorIsLoggedIn)
    const isRegister = useSelector(selectorIsRegister)

    type FormikErrorType = {
        email?: string
        password?: string
    }
    const disable = status === 'loading'
    const formik = useFormik({
        initialValues: {
            email: 'potapov.eo@yandex.ru',
            password: 'jekajeka',
            password2: 'jekajeka',
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
            } else if (values.password2 !== values.password) {
                errors.password = 'Passwords do not match';
            }
            return errors;
        },


        onSubmit: values => {
            dispatch(RegisterTC({email: values.email, password: values.password}))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }
    if (isRegister) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return <div className="App">

        <form onSubmit={formik.handleSubmit}>
            <h1>REGISTRATION</h1>
            <div>
                <SuperInput
                    placeholder={"email"}
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: "red"}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <SuperInput
                    placeholder={"password"}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>
            <div>
                <SuperInput
                    placeholder={"password2"}
                    type="password"
                    name="password2"
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            </div>
            <SuperButton disabled={disable} type="submit"/>

        </form>


    </div>
}