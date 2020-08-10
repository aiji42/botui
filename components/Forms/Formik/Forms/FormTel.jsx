import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputTel, * as tel from '../Elements/InputTel';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputTel} name="tel" title="電話番号(ハイフン無し)" autoFocus />
      <ErrorMessage name="tel" component={SpanErrorMessage} />

      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormTel = withFormik({
  mapPropsToValues: () => ({ ...tel.initialValue('tel') }),
  validationSchema: yup.object().shape({ ...tel.validation('tel') }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormTel;