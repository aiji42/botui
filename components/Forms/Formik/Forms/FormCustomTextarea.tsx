import { FC } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import TextareaWithIcon from '../Elements/TextareaWithIcon';
import { customYup, CustomYupProps, customHandleSubmit, HandleSubmitProps } from './modules'

type Values = {
  [key: string]: string
}

type PropTypes = {
  title: string
  placeholder?: string
} & CustomYupProps & HandleSubmitProps

const Form: FC<FormikProps<Values> & PropTypes> = (props) => {
  const { name, placeholder, title, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name={name} component={TextareaWithIcon} placeholder={placeholder} title={title} autoFocus />
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormCustomTextarea = withFormik({
  mapPropsToValues: ({ name }: PropTypes) => ({ [name]: '' }),
  validationSchema: customYup,
  validateOnMount: true,
  handleSubmit: customHandleSubmit,
})(Form);

export default FormCustomTextarea;