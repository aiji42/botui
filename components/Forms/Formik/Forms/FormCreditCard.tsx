import { FC, useMemo } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { dataStore } from '../../../../dataStore';
import CreditCard from 'credit-card';
import InputCreditNumber from '../Elements/InputCreditNumber';
import InputNumber from '../Elements/InputNumber';
import SelectWithIcon from '../Elements/SelectWithIcon';
import InputWithIcon from '../Elements/InputWithIcon';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';

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


type Values = {
  creditCardNumber: string
  creditCardExpiryYear: string
  creditCardExpiryMonth: string
  creditCardName: string
  creditCardCvc: string
  [key: string]: string
}

const makeValidate = ({ values, setErrors }: FormikProps<Values>) => () => {
  const { creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, creditCardCvc } =  values
  const {
    validCardNumber,
    validExpiryMonth,
    validExpiryYear,
    validCvv,
    isExpired
  } = CreditCard.validate({
    cardType: CreditCard.determineCardType(creditCardNumber),
    number: creditCardNumber,
    expiryMonth: creditCardExpiryMonth,
    expiryYear: creditCardExpiryYear,
    cvv: creditCardCvc
  });

  if ([validCardNumber, validExpiryMonth, validExpiryYear, validCvv, !isExpired].every(bool => bool)) {
    setErrors({});
    return true;
  }

  const errors: { [key in keyof Values] ?: string } = {};
  if (!validCardNumber) errors.creditCardNumber = '正しいカード番号を入力してください';
  if (!validExpiryMonth || isExpired) errors.creditCardExpiryMonth = '正しい有効期限を選択してください';
  if (!validExpiryYear || isExpired) errors.creditCardExpiryYear = '正しい有効期限を選択してください';
  if (!validCvv) errors.creditCardCvc = '正しいセキュリティコードを入力してください';
  setErrors(errors);
  return false;
};

const Form: FC<FormikProps<Values>> = (props) => {
  const { handleSubmit } = props;
  const years = useMemo(() => [...Array(15)].map((_, k) => new Date().getFullYear() + k), [])
  const monthes = useMemo(() => [...Array(12)].map((_, k) => k + 1), [])
  const validate = useMemo(() => makeValidate(props), [props])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputCreditNumber} autoComplete="cc-number" placeholder="0123 4567 8901 2345" name="creditCardNumber" title="カード番号" autoFocus />
      <ErrorMessage name="creditCardNumber" component={SpanErrorMessage} />

      <Field component={InputWithIcon} type="text" autoComplete="cc-name" placeholder="TARO YAMADA" name="creditCardName" title="クレジットカード名義人" />
      <ErrorMessage name="creditCardName" component={SpanErrorMessage} />

      <div css={[style.narrowField, style.left]}>
        <Field component={SelectWithIcon} name="creditCardExpiryMonth" title="月" autoComplete="cc-exp-month">
          <option value="">MM</option>
          {monthes.map((month) => (<option key={month} value={`0${month}`.slice(-2)}>{`0${month}`.slice(-2)}</option>))}
        </Field>
      </div>
      <div css={[style.narrowField]}>
        <Field component={SelectWithIcon} name="creditCardExpiryYear" title="年" autoComplete="cc-exp-year">
          <option value="">YY</option>
          {years.map((year) => (<option key={year} value={year}>{`${year}`.slice(-2)}</option>))}
        </Field>
      </div>
      <ErrorMessage name="creditCardExpiryYear" component={SpanErrorMessage} />
      <ErrorMessage name="creditCardExpiryMonth" component={SpanErrorMessage} />

      <Field component={InputNumber} autoComplete="cc-csc" placeholder="123" name="creditCardCvc" title={<span>CVC <small>(通常裏面に刻印されています)</small></span>} />
      <ErrorMessage name="creditCardCvc" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} onClick={validate} />
    </form>
  );
};

type FormikBag = {
  props: {
    onSubmited: () => void
    onUpdate: () => void
  }
} & FormikHelpers<Values>

const FormBirthDay = withFormik({
  mapPropsToValues: () => ({
    creditCardNumber: '',
    creditCardExpiryYear: '',
    creditCardExpiryMonth: '',
    creditCardName: '',
    creditCardCvc: ''
  }),
  validationSchema: yup.object().shape({
    creditCardNumber: yup.string()
      .required('入力してください')
      .transform((val) => CreditCard.sanitizeNumberString(val))
      .matches(/\d{14,16}/, '正しい形式で入力してください')
      .test('credit-card-number', '正しい形式で入力してください',
        (val) => !!CreditCard.determineCardType(val) && CreditCard.isValidCardNumber(val, CreditCard.determineCardType(val))
      ),
    creditCardExpiryYear: yup.string().required('選択してください'),
    creditCardExpiryMonth: yup.string().required('選択してください'),
    creditCardName: yup.string().required('入力して下さい'),
    creditCardCvc: yup.string().required('入力してください').matches(/^\d{3,4}$/, '正しい形式で入力してください')
  }),
  validateOnMount: true,
  handleSubmit: (values: Values, { props, setSubmitting }: FormikBag) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(Form);

export default FormBirthDay;