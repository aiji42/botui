import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import { isValidNumber as isValidPhoneNumber } from 'libphonenumber-js';
import Moji from 'moji';
import { findStoredValue } from '../../../../dataStore';

const toHan = (value) => (new Moji(value)).convert('ZE', 'HE').toString().replace(/[^0-9]/g, '');

const InputTel = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="tel" placeholder="09012345678" field={field} form={form} {...props}
      onBlur={(e) => {
        form.setFieldValue(field.name, toHan(e.target.value));
        field.onBlur(e);
      }}
    />
  );
};

InputTel.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputTel;

const validation = (name) => ({
  [name]: yup.string()
    .transform(toHan)
    .matches(/^(0{1}\d{9,10})$/, '半角数字で正しく入力してください')
    .test('tel-format', '半角数字で正しく入力してください', (value) => value ? isValidPhoneNumber(value, 'JP') : false)
});

const initialValue = (name) => ({[name]: findStoredValue(name, '')});

export { validation, initialValue };