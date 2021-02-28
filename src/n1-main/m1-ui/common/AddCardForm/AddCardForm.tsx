import React from 'react'
import {useFormik} from 'formik'
import SuperInput from "../SuperInput/SuperInput";
import SuperButton from "../SuperButton/SuperButton";

export type valueType = { question: string, answer: string }
type AddCardFormPropsType = {

    addCard: (value: valueType) => void
    text?: string
}
export const AddCardForm = React.memo((props: AddCardFormPropsType
) => {

    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.question) {
                errors.question = "Required field"
            }
            if (!values.answer) {
                errors.answer = "Required field"
            }

            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
            props.addCard(values)
        },
    })

    return (
        <div>
            <div>{props.text}</div>
            <form onSubmit={formik.handleSubmit}>
                <div><SuperInput name="question" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text"
                                 value={formik.values.question} placeholder={"question"}/></div>
                {formik.touched.question && formik.errors.question ?
                    <div style={{color: "red"}}> {formik.errors.question} </div> : null}
                <div><SuperInput name="answer" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                 type="answer" value={formik.values.answer} placeholder={"answer"}/></div>
                {formik.touched.answer && formik.errors.answer ?
                    <div style={{color: "red"}}> {formik.errors.answer} </div> : null}

                <div><SuperButton type="submit" name="ADD"/></div>
            </form>
        </div>
    )
})

type FormikErrorType = {
    question?: string
    answer?: string

}