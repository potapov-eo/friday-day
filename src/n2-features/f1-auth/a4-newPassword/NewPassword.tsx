import React from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import SuperButton from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperInput from "../../../n1-main/m1-ui/common/SuperInput/SuperInput";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {setPasswordTC} from "../auth-reducer";
import {selectorStatus} from "../../../n1-main/m2-bll/appSelector";
import {selectorNewPassword} from "../authSelector";

export const NewPassword = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectorStatus)
    const newPassword = useSelector(selectorNewPassword)
    type FormikErrorType = {
        password?: string
        resetPasswordToken?: string
    }

    let {token} = useParams<{ token: string }>()

    const disable = status === 'loading'

    const formik = useFormik({
        initialValues: {
            password: '',
            password2: '',
            resetPasswordToken: (token)
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'password Required';
            } else if (values.password.length < 7) {
                errors.password = 'length of passwords should be 7 and more simbols';
            } else if (values.password2 !== values.password) {
                errors.password = 'Passwords do not match';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(setPasswordTC({password: values.password, resetPasswordToken: values.resetPasswordToken}))
            formik.resetForm()
        },
    })
    if (newPassword) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return <div className="App">
        <form onSubmit={formik.handleSubmit}>
            NewPassword
            <div>
                <SuperInput
                    placeholder={"password"}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <SuperInput
                    placeholder={"confirm password"}
                    type="password"
                    name="password2"
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                />
                {formik.touched.password2 && formik.errors.password2 ?
                    <div style={{color: "red"}}>{formik.errors.password2}</div> : null}
            </div>

            <SuperButton disabled={disable} type="submit" name='Send'/>

        </form>
    </div>
}
