import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue, findStoredValue } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import SelectWithIcon from '../Elements/SelectWithIcon';

const sanitize = (selects) => selects.reduce((res, { name, title, options, stored, storedName }) => (
  [...res, { name, title, options: (stored ? dataStore[storedName] : options) }]
), []);

const form = (props) => {
  const { selects, handleSubmit } = props;
  const [sanitizedSelects, setSanitizedSelects] = useState([]);
  useEffect(() => {
    setSanitizedSelects(sanitize(selects));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {sanitizedSelects.map(({ name, title, options }, index) => (
        <Fragment key={index}>
          <Field name={name}>
            {({ field, form }) => (
              <SelectWithIcon field={field} form={form} title={title}>
                {Array.isArray(options) && options.map(({ value, label }, index) => <option key={index} value={value}>{label}</option>)}
                {!Array.isArray(options) && Object.keys(options).map((key, index) => <option key={index} value={key}>{options[key]}</option>)}
              </SelectWithIcon>
            )}
          </Field>
          <ErrorMessage name={name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.defaultProps = {
  choicesFromDataStore: false,
  selects: []
};

form.propTypes = {
  ...formPropTypes,
  selects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    options: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
    ]),
    secure: PropTypes.bool,
    stored: PropTypes.bool,
    storedName: PropTypes.string
  })).isRequired
};

const FormCustomSelect = withFormik({
  mapPropsToValues: ({ selects }) => (selects.reduce((res, { name, secure }) => ({ ...res, [name]: (dataStore[name] || (secure ? '' : findStoredValue(name, ''))) }), {})),
  validationSchema: ({ selects }) => yup.object().shape(selects.reduce((res, { name }) => ({ ...res, [name]: yup.string() }), {})),
  validateOnMount: true,
  handleSubmit: (values, { props: { onSubmited, onUpdate, selects }, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] != null)) onUpdate();
    Object.keys(values).forEach(key => {
      if (!selects.find(({ name }) => name == key).secure) saveStoreValue(key, values[key]);
    });
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormCustomSelect;