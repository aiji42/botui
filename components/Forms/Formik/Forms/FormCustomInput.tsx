import { FC, Fragment } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import InputWithIcon from '../Elements/InputWithIcon';
import { customHandleSubmit, customYup, CustomYupProps } from './modules'
import { FormCustomInputValues, FormCustomInput as FormCustomInputType } from '../../../../@types/form';

const Form: FC<FormikProps<FormCustomInputValues> & FormCustomInputType> = (props) => {
  const { inputs, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ validation: _, ...attributes }, index) => (
        <Fragment key={index}>
          <Field as={InputWithIcon} {...attributes} autoFocus={index === 0} />
          <ErrorMessage name={attributes.name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field as={ButtonSubmit} name="submit" />
    </form>
  );
};

const FormCustomInput = withFormik<FormCustomInputType, FormCustomInputValues>({
  mapPropsToValues: ({ inputs, values }) => ({...inputs.reduce((res, { name }) => ({ ...res, [name]: '' }), {}), ...values}),
  validationSchema: ({ inputs }: FormCustomInputType) => yup.object().shape(inputs.reduce((res, input) => ({ ...res, ...customYup(input) }), {})),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormCustomInput;