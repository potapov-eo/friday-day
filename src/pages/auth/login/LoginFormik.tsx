import React from 'react'
import SuperInput from '../../../components/SuperInput/SuperInput';
import SuperButton from '../../../components/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {useFormik} from 'formik';
import {PATH} from "../../../routes/Routes";
import {selectorIsLoggedIn} from "../../../store/auth-reduser/authSelector";
import {selectorStatus} from "../../../store/app-reduser/appSelector";
import { loginAC } from "../../../store/auth-reduser/auth-sagas";


export const Login = () => {
    const status = useSelector(selectorStatus)
    const isLoggedIn = useSelector(selectorIsLoggedIn)
    const dispatch = useDispatch()

    const disable = status === 'loading'

    const formik = useFormik({
        initialValues: {
            email: "Potapov.eo@mail.ru",
            password: "jekajeka",
            rememberMe: true
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = "Required"
            }
            return errors;
        },
        onSubmit: values => {
            const thunk = loginAC(values.email, values.password, values.rememberMe)
            dispatch(thunk)
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className="App">
            <h1>LOG IN</h1>
            <form onSubmit={formik.handleSubmit}>
                <div><SuperInput name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text"
                                 value={formik.values.email} placeholder={"Email"}/></div>
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: "red"}}> {formik.errors.email} </div> : null}
                <div><SuperInput name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                 type="password" value={formik.values.password} placeholder={"Password"}/></div>
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}> {formik.errors.password} </div> : null}
                <div><span>Remember me </span><input name="rememberMe" onChange={formik.handleChange}
                                                     checked={formik.values.rememberMe} type="checkbox"/></div>
                <div><SuperButton disabled={disable} name="log in"/></div>
            </form>
        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
