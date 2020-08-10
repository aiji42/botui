import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import SelectWithIcon from './SelectWithIcon';
import { findStoredValue } from '../../../../dataStore';

const SelectDay = ({ field, form, ...props }) => {
  return (
    <SelectWithIcon field={field} form={form} {...props}>
      <option value=""></option>
      {[...Array(31)].map((_, k) => k + 1).map((day) => (<option key={day} value={day}>{day}日</option>))}
    </SelectWithIcon>
  );
};

SelectDay.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default SelectDay;

export const validation = (name) => ({
  [name]: yup.string()
    .required('選択してください')
});

export const initialValue = (name) => ({ [name]: findStoredValue(name, '') });