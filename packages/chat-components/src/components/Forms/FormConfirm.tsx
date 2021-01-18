import React, { FC } from 'react'
import { withFormik, Field, FormikProps } from 'formik'
import ButtonSubmit from './Elements/ButtonSubmit'
import { css } from '@emotion/react'
import { customHandleSubmit } from './modules'
import { FormConfirmValues, FormConfirm as FormConfirmType } from '@botui/types'

const base = css`
  color: #676879;
  border-radius: 5px;
  border: solid 2px #0f84fe;
  background-color: #fff;
  padding: 10px;
  line-height: 1.2em;
  font-size: 1.0em;
  h3 {
    margin 10px 0px 5px 0px;
  }
`

const Form: FC<FormikProps<FormConfirmValues>> = (props) => {
  const {
    handleSubmit,
    values: { confirmHTML }
  } = props

  return (
    <form css={base} onSubmit={handleSubmit}>
      <Field component={ButtonSubmit} />
      <p css={{ textAlign: 'center', marginTop: 5 }}>
        下記の内容にお間違いなければボタンを押してください。
      </p>
      <div dangerouslySetInnerHTML={{ __html: confirmHTML }} />
      <Field name="confirmed" type="hidden" />
      <Field component={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormConfirm = withFormik<FormConfirmType, FormConfirmValues>({
  mapPropsToValues: ({ values }) => ({
    confirmed: true,
    confirmHTML: '',
    ...values
  }),
  handleSubmit: customHandleSubmit
})(Form)

export default FormConfirm
