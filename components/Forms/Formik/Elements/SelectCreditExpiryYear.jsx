import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { dataStore } from '../../../../dataStore';

const years = [...Array(15)].map((_, k) => new Date().getFullYear() + k);

const SelectCreditExpiryYear = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon autoComplete="cc-exp-year" field={field} form={form} {...props}>
      <option value="">YY</option>
      {years.map((year) => (<option key={year} value={year}>{`${year}`.slice(-2)}</option>))}
    </SelectWithIcon>
  );
};

SelectCreditExpiryYear.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectCreditExpiryYear;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: dataStore[name] ? dataStore[name] : '' });