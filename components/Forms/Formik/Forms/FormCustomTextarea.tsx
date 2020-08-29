import { FC, TextareaHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import TextareaWithIcon from '../Elements/TextareaWithIcon';
import { customYup, CustomYupProps, customHandleSubmit, HandleSubmitProps } from './modules'

interface Values {
  [key: string]: string
}

type PropTypes = {
  title?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement> & CustomYupProps & HandleSubmitProps

const Form: FC<FormikProps<Values> & PropTypes> = (props) => {
  const { name, title, placeholder, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field as={TextareaWithIcon} name={name} title={title} placeholder={placeholder} autoFocus />
      <ErrorMessage name={name} component={SpanErrorMessage} />
      <Field component={ButtonSubmit} name="submit" />
    </form>
  );
};

const FormCustomTextarea = withFormik<PropTypes, Values>({
  mapPropsToValues: ({ name }: PropTypes) => ({ [name]: '' }),
  validationSchema: (props: PropTypes) => yup.object().shape<object>(customYup(props)),
  validateOnMount: true,
  handleSubmit: customHandleSubmit,
})(Form);

export default FormCustomTextarea;