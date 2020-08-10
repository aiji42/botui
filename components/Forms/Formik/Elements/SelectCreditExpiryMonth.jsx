import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { dataStore } from '../../../../dataStore';

const SelectCreditCardExpiryMonth = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon autoComplete="cc-exp-month" field={field} form={form} {...props}>
      <option value="">MM</option>
      {[...Array(12)].map((_, k) => k + 1).map((month) => (<option key={month} value={`0${month}`.slice(-2)}>{`0${month}`.slice(-2)}</option>))}
    </SelectWithIcon>
  );
};

SelectCreditCardExpiryMonth.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectCreditCardExpiryMonth;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: dataStore[name] ? dataStore[name] : '' });