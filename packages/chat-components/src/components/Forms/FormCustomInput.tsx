import React, { FC, Fragment } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik'
import * as yup from 'yup'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import InputWithIcon from './Elements/InputWithIcon'
import { customHandleSubmit } from './modules'
import {
  FormCustomInputValues,
  FormCustomInput as FormCustomInputType
} from '@botui/types'

const Form: FC<FormikProps<FormCustomInputValues> & FormCustomInputType> = (
  props
) => {
  const { inputs, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {inputs.map(({ validation, ...attributes }, index) => (
        <Fragment key={index}>
          <Field as={InputWithIcon} {...attributes} autoFocus={index === 0} />
          <ErrorMessage name={attributes.name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormCustomInput = withFormik<FormCustomInputType, FormCustomInputValues>({
  mapPropsToValues: ({ inputs, values }) => ({
    ...inputs.reduce((res, { name }) => ({ ...res, [name]: '' }), {}),
    ...values
  }),
  validate: (values, props) => {
    const errors: { [x: string]: string } = {}
    props.inputs.forEach((input) => {
      if (!input.validation) return
      /* eslint no-new-func: "off" */
      const validateFunction = new Function('value', input.validation)
      const res = validateFunction(values[input.name])
      if (typeof res === 'string' && res.length) errors[input.name] = res
    })
    return errors
  },
  validationSchema: ({ inputs }: FormCustomInputType) =>
    yup.object().shape(
      inputs.reduce((res, input) => {
        if (!input.required) return res
        return {
          ...res,
          [input.name]: yup.mixed().required('入力してください')
        }
      }, {})
    ),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormCustomInput
