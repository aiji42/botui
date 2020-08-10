import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue, findStoredValue } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import TextareaWithIcon from '../Elements/TextareaWithIcon';

const form = (props) => {
  const { name, placeholder, title, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name={name} component={TextareaWithIcon} placeholder={placeholder} title={title} autoFocus />
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  secure: PropTypes.bool,
  validation: PropTypes.object
};

const FormCustomTextarea = withFormik({
  mapPropsToValues: ({ name, secure }) => ({ [name]: (dataStore[name] || (secure ? '' : findStoredValue(name, ''))) }),
  validationSchema: ({ name, validation }) => {
    if (!validation) return yup.object().shape({ [name]: yup.string() });
    const { type, ...others } = validation;
    return yup.object().shape({ [name]: Object.keys(others).reduce((res, key) => (res[key](...others[key])), yup[type]()) });
  },
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate, secure }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) onUpdate();
    Object.keys(values).forEach(key => {
      if (!secure) saveStoreValue(key, values[key]);
    });
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormCustomTextarea;