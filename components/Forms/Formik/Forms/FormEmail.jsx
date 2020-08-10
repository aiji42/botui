import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { formPropTypes } from '../PropTypes';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';

const form = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field component={InputWithIcon} type="email" placeholder="yamada@example.com" name="email" title="メールアドレス" autoFocus />
      <ErrorMessage name="email" component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  ...formPropTypes
};

const FormEmail = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: yup.object().shape({
    email: yup.string()
      .required('入力して下さい')
      .matches(/^([a-z0-9+_.-]+)@([a-z0-9-]+\.)+[a-z]{2,6}$/, '正しい形式で入力してください')
  }),
  validateOnMount: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormEmail;

