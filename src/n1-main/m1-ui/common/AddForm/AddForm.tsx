import React from 'react'
import {useFormik} from 'formik'
import SuperInput from "../SuperInput/SuperInput";
import SuperButton from "../SuperButton/SuperButton";

export type valueType = { question: string, answer: string }
type AddCardFormPropsType = {
    addItem: (title: string) => void
    buttonName: string
    itemName: string
    text?:string
}
export const AddForm = React.memo((props: AddCardFormPropsType
) => {

    const formik = useFormik({
        initialValues: {
            values: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.values) {
                errors.values = "Required field"
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            props.addItem(values.values)

        },
    })

    return (
        <div>
            <div>{props.text}</div>
            <form onSubmit={formik.handleSubmit}>
                <div><SuperInput name="values" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                 type="text"
                                 value={formik.values.values} placeholder={props.itemName}/></div>
                {formik.touched.values && formik.errors.values ?
                    <div style={{color: "red"}}> {formik.errors.values} </div> : null}
                <div><SuperButton name={props.buttonName}/></div>
            </form>
        </div>
    )
})

//types
type FormikErrorType = {
    values?: string
}