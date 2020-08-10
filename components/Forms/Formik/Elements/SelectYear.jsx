import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue } from '../../../../dataStore';

const y = [...Array(100)].map((_, k) => new Date().getFullYear() - k);
const years = [...y.slice(0, 35), '', ...y.slice(35)].reverse();

const SelectYeay = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      {years.map((year) => (<option key={year} value={year}>{year !== '' ? `${year}年` : year}</option>))}
    </SelectWithIcon>
  );
};

SelectYeay.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectYeay;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });