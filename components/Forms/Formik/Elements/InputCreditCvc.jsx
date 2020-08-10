import React, { useEffect } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import InputWithIcon from './InputWithIcon';
import Moji from 'moji';
import { dataStore } from '../../../../dataStore';

const onlyNum = (value) => (new Moji(`${value}`)).convert('ZE', 'HE').toString().replace(/[^0-9]/g, '');

const InputCreditCvc = ({ field, form, ...props }) => {
  const { setFieldValue, values } = form;

  useEffect(() => {
    setFieldValue(field.name, onlyNum(values[field.name]));
  }, [values[field.name]]);

  return (
    <InputWithIcon type="text" autoComplete="cc-csc" placeholder="123" field={field} form={form} {...props} />
  );
};

InputCreditCvc.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
};

export default InputCreditCvc;

const validation = (name) => ({
  [name]: yup.string()
    .required('入力してください')
    .matches(/^\d{3,4}$/, '正しい形式で入力してください')
});

const initialValue = (name) => ({ [name]: dataStore[name] ? dataStore[name] : '' });

export { validation, initialValue };