import { FC, Fragment, InputHTMLAttributes } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import InputWithIcon from '../Elements/InputWithIcon';
import { customHandleSubmit, HandleSubmitProps, customYup, CustomYupProps } from './modules'

interface Values {
  [x: string]: any
}

interface Props {
  inputs: ({ title?: string } & InputHTMLAttributes<Element> & CustomYupProps)[]
}

const Form: FC<FormikProps<Values> & Props & HandleSubmitProps> = (props) => {
  const { inputs, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ validation: _, title, ...attributes }, index) => (
        <Fragment key={index}>
          <Field component={InputWithIcon} {...attributes} title={title} autoFocus={index === 0} />
          <ErrorMessage name={attributes.name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormCustomInput = withFormik<Props & HandleSubmitProps, Values>({
  mapPropsToValues: ({ inputs }) => (inputs.reduce((res, { name }) => ({ ...res, [name]: '' }), {})),
  validationSchema: ({ inputs }: Props) => yup.object().shape(inputs.reduce((res, input) => ({ ...res, ...customYup(input) }), {})),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormCustomInput;