import React, {useEffect} from 'react'
import SuperInput from '../../../n1-main/m1-ui/common/SuperInput/SuperInput';
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './login-reducer';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import {AppRootStateType} from '../../../../src/n1-main/m2-bll/store'
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";


export const Login = () => {
  const isLoggedIn  = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
          email: "nya-admin@nya.nya",
          password: "1qazxcvBG",
          rememberMe: false
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
          formik.resetForm()
        const thunk = login( values.email, values.password, values.rememberMe)
            dispatch(thunk)   
        },
      })

      if (isLoggedIn) {
        return <Redirect  to = {PATH.PROFILE}/>
      }
  return (
    <div className="App">
      LOGIN
      <form onSubmit={formik.handleSubmit}>
        <div><SuperInput name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.email} placeholder={"Email"} /></div>
        {formik.touched.email && formik.errors.email ? <div style={{ color: "red" }}> {formik.errors.email} </div> : null}
        <div><SuperInput name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.password} placeholder={"Password"} /></div>
        {formik.touched.password && formik.errors.password ? <div style={{ color: "red" }}> {formik.errors.password} </div> : null}
        <div><span>Remember me </span><SuperInput name="rememberMe" onChange={formik.handleChange} checked={formik.values.rememberMe} type="checkbox" /></div>
        <div><SuperButton name="login" /></div>
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
