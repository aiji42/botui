import React, { FC } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik'
import * as yup from 'yup'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import TextareaWithIcon from './Elements/TextareaWithIcon'
import { customHandleSubmit } from './modules'
import {
  FormCustomTextareaValues,
  FormCustomTextarea as FormCustomTextareaType
} from '@botui/types'

const Form: FC<
  FormikProps<FormCustomTextareaValues> & FormCustomTextareaType
> = (props) => {
  const { name, title, placeholder, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        as={TextareaWithIcon}
        name={name}
        title={title}
        placeholder={placeholder}
        autoFocus
      />
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormCustomTextarea = withFormik<
  FormCustomTextareaType,
  FormCustomTextareaValues
>({
  mapPropsToValues: ({ name, values }) => ({ [name]: '', ...values }),
  validate: (values, { name, validation }: FormCustomTextareaType) => {
    const errors: Record<string, string> = {}
    if (validation) {
      /* eslint no-new-func: "off" */
      const validateFunction = new Function('value', validation)
      const res = validateFunction(values[name])
      if (typeof res === 'string' && res.length) errors[name] = res
    }
    return errors
  },
  validationSchema: ({ required, name }: FormCustomTextareaType) =>
    yup.object().shape(
      required
        ? {
            [name]: yup.string().required('入力してください')
          }
        : {}
    ),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormCustomTextarea
