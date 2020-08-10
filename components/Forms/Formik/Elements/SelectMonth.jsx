import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue } from '../../../../dataStore';

const SelectMonth = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      <option value=""></option>
      {[...Array(12)].map((_, k) => k + 1).map((month) => (<option key={month} value={month}>{month}月</option>))}
    </SelectWithIcon>
  );
};

SelectMonth.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectMonth;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });