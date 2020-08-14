import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { formPropTypes } from '../PropTypes';
import { dataStore } from '../../../../dataStore';
import CreditCard from 'credit-card';
import InputCreditNumber from '../Elements/InputCreditNumber';
import InputNumber from '../Elements/InputNumber';
import SelectWithIcon from '../Elements/SelectWithIcon';
import InputWithIcon from '../Elements/InputWithIcon';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import * as BrandIcon from '../Elements/IconsCreditBrand';

const narrowField = css`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 2px;
  width: 49%;
`;

const left = css`
  margin-right: 2px;
`;

const cards = css`
  padding: 4px;
  text-align: center;
`;

const cardIcon = css`
  height: 25px;
  margin-right: 2px;
`;

const validate = ({ creditCardNumber, creditCardExpiryMonth, creditCardExpiryYear, creditCardCvc }, setErrors) => {
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

  const errors = {};
  if (!validCardNumber) errors.creditCardNumber = '正しいカード番号を入力してください';
  if (!validExpiryMonth || isExpired) errors.creditCardExpiryMonth = '正しい有効期限を選択してください';
  if (!validExpiryYear || isExpired) errors.creditCardExpiryYear = '正しい有効期限を選択してください';
  if (!validCvv) errors.creditCardCvc = '正しいセキュリティコードを入力してください';
  setErrors(errors);
  return false;
};

const form = (props) => {
  const { handleSubmit, values, setErrors, brands } = props;
  const years = useMemo(() => [...Array(15)].map((_, k) => new Date().getFullYear() + k), [])
  const monthes = useMemo(() => [...Array(12)].map((_, k) => k + 1), [])

  return (
    <form onSubmit={handleSubmit}>
      {brands && brands.length > 0 &&
        <div css={cards}>
          {brands.includes('visa') && <BrandIcon.Visa css={cardIcon} />}
          {brands.includes('jcb') && <BrandIcon.Jcb css={cardIcon} />}
          {brands.includes('mastercard') && <BrandIcon.Mastercard css={cardIcon} />}
          {brands.includes('diners') && <BrandIcon.Diners css={cardIcon} />}
          {brands.includes('amex') && <BrandIcon.Amex css={cardIcon} />}
        </div>
      }

      <Field component={InputCreditNumber} autoComplete="cc-number" placeholder="0123 4567 8901 2345" name="creditCardNumber" title="カード番号" autoFocus />
      <ErrorMessage name="creditCardNumber" component={SpanErrorMessage} />

      <Field component={InputWithIcon} type="text" autoComplete="cc-name" placeholder="TARO YAMADA" name="creditCardName" title="クレジットカード名義人" />
      <ErrorMessage name="creditCardName" component={SpanErrorMessage} />

      <div css={[narrowField, left]}>
        <Field component={SelectWithIcon} name="creditCardExpiryMonth" title="月" autoComplete="cc-exp-month">
          <option value="">MM</option>
          {monthes.map((month) => (<option key={month} value={`0${month}`.slice(-2)}>{`0${month}`.slice(-2)}</option>))}
        </Field>
      </div>
      <div css={[narrowField]}>
        <Field component={SelectWithIcon} name="creditCardExpiryYear" title="年" autoComplete="cc-exp-year">
          <option value="">YY</option>
          {years.map((year) => (<option key={year} value={year}>{`${year}`.slice(-2)}</option>))}
        </Field>
      </div>
      <ErrorMessage name="creditCardExpiryYear" component={SpanErrorMessage} />
      <ErrorMessage name="creditCardExpiryMonth" component={SpanErrorMessage} />

      <Field component={InputNumber} autoComplete="cc-csc" placeholder="123" name="creditCardCvc" title={<span>CVC <small>(通常裏面に刻印されています)</small></span>} />
      <ErrorMessage name="creditCardCvc" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} onClick={() => { validate(values, setErrors); }} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes,
  brands: PropTypes.arrayOf(PropTypes.string)
};

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
    creditCardExpiryMonth: : yup.string().required('選択してください'),
    creditCardName: yup.string().required('入力して下さい'),
    creditCardCvc: yup.string().required('入力してください').matches(/^\d{3,4}$/, '正しい形式で入力してください')
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormBirthDay;