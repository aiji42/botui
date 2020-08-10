import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import Moji from 'moji';
import InputWithIcon from './InputWithIcon';
import { findStoredValue } from '../../../../dataStore';

const toKatakana = (value) => (new Moji(value)).convert('HG', 'KK').toString().replace(/[^ァ-ン]/g, '');

const InputNameKana = ({ field, form, ...props }) => {
  return (
    <InputWithIcon type="text" field={field} form={form} {...props}
      onBlur={(e) => {
        form.setFieldValue(field.name, toKatakana(e.target.value));
        field.onBlur(e);
      }}
    />
  );
};

InputNameKana.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputNameKana;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .transform(toKatakana)
    .max(50, '入力内容が長すぎます')
    .matches(/^[ァ-ヶ]+$/, '全角カナで入力してください')
});

const initialValue = (name) => ({ [name]: findStoredValue(name, '') });

export { validation, initialValue };