import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import RadioInput from '../Elements/RadioInput';
import { css } from '@emotion/core';

const mergin = css`
  margin-top: 5px;
`;

const form = (props) => {
  const { name, choices, stored, storedName, values, handleSubmit } = props;
  const [sanitizedChoices, setSanitizedChoices] = useState({});
  useEffect(() => {
    if (values[name]) handleSubmit();
  }, [values]);
  useEffect(() => {
    Object.keys(values).forEach(key => dataStore[key] = null);
    setSanitizedChoices(stored ? dataStore[storedName] : choices);
  }, []);

  return (
    <form>
      <Field name={name}>
        {({ field, form }) => Object.keys(sanitizedChoices).map((key, index) => (
          <div key={index} css={index > 0 ? mergin : ''}>
            <RadioInput id={key} title={sanitizedChoices[key]} field={field} form={form} />
          </div>
        ))}
      </Field>
      <ErrorMessage name={name} component={SpanErrorMessage} />
    </form>
  );
};

form.defaultProps = {
  stored: false,
  choices: {}
};

form.propTypes = {
  ...formPropTypes,
  name: PropTypes.string.isRequired,
  choices: PropTypes.object.isRequired,
  stored: PropTypes.bool.isRequired,
  storedName: PropTypes.string
};

const FormCustomRadioGroup = withFormik({
  mapPropsToValues: ({ name }) => ({ [name]: '' }),
  validationSchema: ({ name }) => yup.object().shape({
    [name]: yup.string().required('選択してください')
  }),
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) {
      Object.keys(values).forEach(key => dataStore[key] = values[key]);
      onUpdate();
    } else {
      Object.keys(values).forEach(key => dataStore[key] = values[key]);
      onSubmited();
    }
    setSubmitting(false);
  },
})(form);

export default FormCustomRadioGroup;