import React, { FC, useMemo, useEffect } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps, useField } from 'formik'
import * as yup from 'yup'
import cardValidator from 'card-validator'
import InputCreditNumber from './Elements/InputCreditNumber'
import InputNumber from './Elements/InputNumber'
import SelectWithIcon from './Elements/SelectWithIcon'
import InputWithIcon from './Elements/InputWithIcon'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import { css } from '@emotion/react'
import { customHandleSubmit } from './modules'
import {
  FormCreditCardValues,
  FormCreditCard as FormCreditCardType
} from '@botui/types'

const style = {
  narrowField: css`
    display: inline-block;
    vertical-align: top;
    margin-bottom: 2px;
    width: 49%;
  `,
  left: css`
    margin-right: 2px;
  `,
  cards: css`
    padding: 4px;
    text-align: center;
  `,
  cardIcon: css`
    height: 25px;
    margin-right: 2px;
  `
}

const onlyNum = (value: string | number): string =>
  `${value}`.normalize('NFKC').replace(/[^0-9]/g, '')

const Form: FC<FormikProps<FormCreditCardValues>> = (props) => {
  const { handleSubmit } = props
  const years = useMemo(
    () => [...Array(15)].map((_, k) => new Date().getFullYear() + k),
    []
  )
  const months = useMemo(() => [...Array(12)].map((_, k) => k + 1), [])
  const [, { value: dummyNum }] = useField('creditCardNumberDummy')
  const [, , { setValue: setNum }] = useField('creditCardNumber')
  useEffect(() => {
    setNum(onlyNum(dummyNum))
  }, [dummyNum])

  return (
    <form onSubmit={handleSubmit}>
      <Field
        as={InputCreditNumber}
        autoComplete="cc-number"
        placeholder="0123 4567 8901 2345"
        name="creditCardNumberDummy"
        title="カード番号"
        autoFocus
      />
      <ErrorMessage name="creditCardNumberDummy" component={SpanErrorMessage} />
      <Field type="hidden" name="creditCardNumber" />

      <Field
        as={InputWithIcon}
        type="text"
        autoComplete="cc-name"
        placeholder="TARO YAMADA"
        name="creditCardName"
        title="クレジットカード名義人"
      />
      <ErrorMessage name="creditCardName" component={SpanErrorMessage} />

      <div css={[style.narrowField, style.left]}>
        <Field
          as={SelectWithIcon}
          name="creditCardExpiryMonth"
          title="月"
          autoComplete="cc-exp-month"
        >
          <option value="">MM</option>
          {months.map((month) => (
            <option key={month} value={`0${month}`.slice(-2)}>
              {`0${month}`.slice(-2)}
            </option>
          ))}
        </Field>
      </div>
      <div css={[style.narrowField]}>
        <Field
          as={SelectWithIcon}
          name="creditCardExpiryYear"
          title="年"
          autoComplete="cc-exp-year"
        >
          <option value="">YY</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {`${year}`.slice(-2)}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage name="creditCardExpiryYear" component={SpanErrorMessage} />
      <ErrorMessage name="creditCardExpiryMonth" component={SpanErrorMessage} />

      <Field
        as={InputNumber}
        autoComplete="cc-csc"
        placeholder="123"
        name="creditCardCvc"
        title={
          <span>
            CVC <small>(通常裏面に刻印されています)</small>
          </span>
        }
      />
      <ErrorMessage name="creditCardCvc" component={SpanErrorMessage} />

      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormBirthDay = withFormik<FormCreditCardType, FormCreditCardValues>({
  mapPropsToValues: ({ values }) => ({
    creditCardNumber: '',
    creditCardNumberDummy: '',
    creditCardExpiryYear: '',
    creditCardExpiryMonth: '',
    creditCardName: '',
    creditCardCvc: '',
    ...values
  }),
  validationSchema: yup.object().shape({
    creditCardNumberDummy: yup
      .string()
      .required('入力してください')
      .test(
        'credit-card-number-duumy',
        '正しい番号を入力してください',
        function () {
          return cardValidator.number(this.parent.creditCardNumber).isValid
        }
      ),
    creditCardExpiryYear: yup
      .string()
      .required('選択してください')
      .test(
        'credit-card-date',
        '正しい有効期限を選択してください',
        function (val) {
          return cardValidator.expirationDate({
            month: this.parent.creditCardExpiryMonth,
            year: val
          }).isValid
        }
      ),
    creditCardExpiryMonth: yup.string().required('選択してください'),
    creditCardName: yup.string().required('入力して下さい'),
    creditCardCvc: yup
      .string()
      .required('入力してください')
      .matches(/^\d{3,4}$/, '正しい形式で入力してください')
      .test(
        'credit-card-cvc',
        '正しいコードを入力してください',
        function (val) {
          return cardValidator.cvv(
            val,
            cardValidator.number(this.parent.creditCardNumber).card?.code.size
          ).isValid
        }
      )
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormBirthDay
