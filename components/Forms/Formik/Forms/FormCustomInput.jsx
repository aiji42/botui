import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue, findStoredValue } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import InputWithIcon from '../Elements/InputWithIcon';

const form = (props) => {
  const { inputs, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ name, title, placeholder, type }, index) => (
        <Fragment key={index}>
          <Field name={name} component={InputWithIcon} type={type} placeholder={placeholder} title={title} autoFocus={index === 0} />
          <ErrorMessage name={name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.defaultProps = {
  inputs: []
};

form.propTypes = {
  ...formPropTypes,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    secure: PropTypes.bool,
    validation: PropTypes.object
  })).isRequired
};

const FormCustomInput = withFormik({
  mapPropsToValues: ({ inputs }) => (inputs.reduce((res, { name, secure }) => (
    { ...res, [name]: (dataStore[name] || (secure ? '' : findStoredValue(name, ''))) }
  ), {})),
  validationSchema: ({ inputs }) => yup.object().shape(inputs.reduce((res, { name, validation }) => {
    if (!validation) return res;
    const { type, ...others } = validation;
    return { ...res, [name]: Object.keys(others).reduce((res, key) => (res[key](...others[key])), yup[type]()) };
  }, {})),
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate, inputs }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) onUpdate();
    Object.keys(values).forEach(key => {
      if (!inputs.find(({ name }) => name == key).secure) saveStoreValue(key, values[key]);
    });
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormCustomInput;