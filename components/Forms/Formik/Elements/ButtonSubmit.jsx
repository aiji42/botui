import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, fieldPropTypes } from '../PropTypes';
import Button from './Button';
import { findStoredValue, dataStore } from '../../../../dataStore';

const isSubmitedOnce = (values) => Object.keys(values).every(key => dataStore[key] !== null);
const isModified = (values) => Object.keys(values).some(key => findStoredValue(key) !== values[key]);

const ButtonSubmit = ({ field, form, children, ...props }) => {
  const [modified, setModified] = useState(false);
  const [submitedOnce, setSubmitedOnce] = useState(false);
  const { values, isValid, isSubmitting } = form;
  useEffect(() => { Object.keys(values).forEach(key => dataStore[key] = null); }, []);
  useEffect(() => { setModified(isModified(values)); }, [values]);
  useEffect(() => {
    if (isSubmitting) return;
    setModified(false);
    setSubmitedOnce(isSubmitedOnce(values));
  }, [isSubmitting]);

  const disabled = Object.keys(values).length > 0 && (!isValid || (submitedOnce && !modified));

  return (
    <Button type="submit" onBlur={field.handleBlur} {...props} disabled={disabled}>
      {children || (submitedOnce && modified ? '変更' : '次へ')}
    </Button>
  );
};

ButtonSubmit.propTypes = {
  field: PropTypes.shape(fieldPropTypes),
  form: PropTypes.shape(formPropTypes),
  children: PropTypes.any
};

export default ButtonSubmit;