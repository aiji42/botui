import { Fragment, FC } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik'
import * as yup from 'yup'
import SpanErrorMessage from '../Elements/SpanErrorMessage'
import ButtonSubmit from '../Elements/ButtonSubmit'
import SelectWithIcon from '../Elements/SelectWithIcon'
import { customHandleSubmit } from './modules'
import {
  FormCustomSelectValues,
  FormCustomSelect as FormCustomSelectType
} from '@botui/types'

const Form: FC<FormikProps<FormCustomSelectValues> & FormCustomSelectType> = (
  props
) => {
  const { selects, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {selects.map(({ options, validation: _, ...select }, index) => (
        <Fragment key={index}>
          <Field as={SelectWithIcon} {...select}>
            <>
              <option label="選択してください" />
              {options.map((attributes, index) => (
                <option key={index} {...attributes} />
              ))}
            </>
          </Field>
          <ErrorMessage name={select.name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormCustomSelect = withFormik<
  FormCustomSelectType,
  FormCustomSelectValues
>({
  mapPropsToValues: ({ selects, values }) => ({
    ...selects.reduce((res, { name }) => ({ ...res, [name]: '' }), {}),
    ...values
  }),
  validationSchema: ({ selects }: FormCustomSelectType) =>
    yup.object().shape(
      selects.reduce(
        (res, { name }) => ({
          ...res,
          [name]: yup.mixed().required('選択してください')
        }),
        {}
      )
    ),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormCustomSelect
