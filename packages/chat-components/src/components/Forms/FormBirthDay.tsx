import React, { FC, useMemo } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik'
import * as yup from 'yup'
import SelectWithIcon from './Elements/SelectWithIcon'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import { css } from '@emotion/react'
import { customHandleSubmit } from './modules'
import {
  FormBirthDayValues,
  FormBirthDay as FormBirthDayType
} from '@botui/types'
import fillRange from 'fill-range'

const style = {
  formBlockDetailHalfField: css`
    display: inline-block;
    vertical-align: top;
    margin-bottom: 2px;
    width: 49%;
  `,
  left: css`
    margin-right: 3px;
  `
}

const Form: FC<FormikProps<FormBirthDayValues>> = (props) => {
  const { handleSubmit, status } = props
  const years = useMemo<Array<number | string>>(() => {
    const thisYear = new Date().getFullYear()
    const y = fillRange(thisYear, thisYear - 100)
    return [...y.slice(0, 35), '', ...y.slice(35)].reverse()
  }, [])
  const months = useMemo<Array<number | string>>(() => {
    const pad = (value: number) =>
      status.paddingZero ? String(value).padStart(2, '0') : value
    return fillRange(1, 12, pad)
  }, [])
  const days = useMemo<Array<number | string>>(() => {
    const pad = (value: number) =>
      status.paddingZero ? String(value).padStart(2, '0') : value
    return fillRange(1, 31, pad)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Field as={SelectWithIcon} name="birthdayYear" title="年">
        {years.map((year) => (
          <option key={year} value={year}>
            {year !== '' ? `${year}年` : year}
          </option>
        ))}
      </Field>
      <ErrorMessage name="birthdayYear" component={SpanErrorMessage} />

      <div css={[style.formBlockDetailHalfField, style.left]}>
        <Field as={SelectWithIcon} name="birthdayMonth" title="月">
          <option value=""></option>
          {months.map((month) => (
            <option key={month} value={month}>
              {Number(month)}月
            </option>
          ))}
        </Field>
        <ErrorMessage name="birthdayMonth" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalfField}>
        <Field as={SelectWithIcon} name="birthdayDay" title="日">
          <option value=""></option>
          {days.map((day) => (
            <option key={day} value={day}>
              {Number(day)}日
            </option>
          ))}
        </Field>
        <ErrorMessage name="birthdayDay" component={SpanErrorMessage} />
      </div>
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormBirthDay = withFormik<FormBirthDayType, FormBirthDayValues>({
  mapPropsToValues: ({ values }) => ({
    birthdayYear: '',
    birthdayMonth: '',
    birthdayDay: '',
    ...values
  }),
  validationSchema: yup.object().shape({
    birthdayYear: yup.string().required('選択してください'),
    birthdayMonth: yup.string().required('選択してください'),
    birthdayDay: yup.string().required('選択してください')
  }),
  validate: (values: FormBirthDayValues) => {
    const { birthdayYear, birthdayMonth, birthdayDay } = values
    const date = new Date(
      Number(birthdayYear),
      Number(birthdayMonth) - 1,
      Number(birthdayDay)
    )
    if (
      !!birthdayYear &&
      !!birthdayMonth &&
      !!birthdayDay &&
      date.getMonth() + 1 !== Number(birthdayMonth)
    ) {
      return {
        birthdayYear: '存在しない日付です',
        birthdayMonth: true,
        birthdayDay: true
      }
    }
    return {}
  },
  validateOnMount: true,
  mapPropsToStatus: ({ status }) => status,
  handleSubmit: customHandleSubmit
})(Form)

export default FormBirthDay
