import { FC } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import TextareaWithIcon from '../Elements/TextareaWithIcon';

type Values = {
  [key: string]: string
}

type ValidationKeys = 'min' | 'max' | 'required'

type PropTypes = {
  name: string
  title: string
  placeholder?: string
  secure?: boolean
  validation?: {
    [key in ValidationKeys]: any[]
  } & { type: 'string' | 'number' }
}

const form: FC<FormikProps<Values> & PropTypes> = (props) => {
  const { name, placeholder, title, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name={name} component={TextareaWithIcon} placeholder={placeholder} title={title} autoFocus />
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

type FormikBag = {
  props: {
    onSubmited: () => void
    onUpdate: () => void
  } & PropTypes
} & FormikHelpers<Values>

const FormCustomTextarea = withFormik({
  mapPropsToValues: ({ name }: PropTypes) => ({ [name]: '' }),
  validationSchema: ({ name, validation }: PropTypes) => {
    if (!validation) return yup.object().shape({ [name]: yup.string() });
    const { type, ...others } = validation;
    // return yup.object().shape({ [name]: Object.keys(others).reduce((res, key) => (res[key](...others[key])), yup[type]()) });
  },
  validateOnMount: true,
  handleSubmit: (values: Values, { props: { onSubmited, onUpdate, secure }, setSubmitting }: FormikBag) => {
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