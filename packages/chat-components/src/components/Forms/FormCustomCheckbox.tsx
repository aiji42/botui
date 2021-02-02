/** @jsxImportSource @emotion/react */
import React, { FC } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik'
import * as yup from 'yup'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import Checkbox from './Elements/Checkbox'
import { css } from '@emotion/react'
import { customHandleSubmit } from './modules'
import ButtonSubmit from './Elements/ButtonSubmit'
import {
  FormCustomCheckbox as FormCustomCheckboxType,
  FormCustomCheckboxValues
} from '@botui/types'

const style = {
  base: css({
    color: '#757575'
  }),
  margin: css({
    marginTop: 5
  })
}

const Form: FC<
  FormikProps<FormCustomCheckboxValues> & FormCustomCheckboxType
> = (props) => {
  const { name, inputs, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ title, ...attributes }, index) => (
        <div key={index} css={[style.base, index > 0 ? style.margin : '']}>
          <Field title={title} {...attributes} name={name} as={Checkbox} />
        </div>
      ))}
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormCustomCheckbox = withFormik<
  FormCustomCheckboxType,
  FormCustomCheckboxValues
>({
  mapPropsToValues: ({ name }) => ({ [name]: '' }),
  validationSchema: ({ required, name }: FormCustomCheckboxType) =>
    yup.object().shape(
      required
        ? {
            [name]: yup.array().required('選択してください')
          }
        : {}
    ),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormCustomCheckbox
