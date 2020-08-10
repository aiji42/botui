import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import Moji from 'moji';
import { findStoredValue } from '../../../../dataStore';

const toHan = (value) => (new Moji(value)).convert('ZE', 'HE').toString().replace(/[^0-9]/g, '');

const InputPostalCode = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="tel" placeholder="1500002" field={field} form={form} {...props}
      onBlur={(e) => {
        form.setFieldValue(field.name, toHan(e.target.value));
        field.onBlur(e);
      }}
    />
  );
};

InputPostalCode.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputPostalCode;

const validation = (name) => ({
  [name]: yup.string()
    .transform(toHan)
    .required('入力してください')
    .matches(/^\d{7}$/, '7桁の数字で正しく入力してください')
});

const initialValue = (name) => ({ [name]: findStoredValue(name, '') });

export { validation, initialValue };