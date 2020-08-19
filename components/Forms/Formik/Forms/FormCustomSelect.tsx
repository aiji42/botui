import React, { Fragment, FC, SelectHTMLAttributes, OptionHTMLAttributes } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import SelectWithIcon from '../Elements/SelectWithIcon';
import { customHandleSubmit, HandleSubmitProps } from './modules'

interface Values {
  [x: string]: any
}

interface Select {
  name: string
  select: SelectHTMLAttributes<HTMLSelectElement> & { title: string }
  options: OptionHTMLAttributes<HTMLOptionElement>[]
}

interface Props {
  selects: Select[]
}

const Form: FC<FormikProps<Values> & Props & HandleSubmitProps> = (props) => {
  const { selects, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {selects.map(({ name, select: { title, ...selectAttributes }, options }, index) => (
        <Fragment key={index}>
          <Field component={SelectWithIcon} name={name} {...selectAttributes} title={title}>
            {options.map((attributes, index) => <option key={index} {...attributes} />)}
          </Field>
          <ErrorMessage name={name} component={SpanErrorMessage} />
        </Fragment>
      ))}
      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormCustomSelect = withFormik<Props & HandleSubmitProps, Values>({
  mapPropsToValues: ({ selects }) => (selects.reduce((res, { name }) => ({ ...res, [name]: '' }), {})),
  validationSchema: ({ selects }: Props) => yup.object().shape(
    selects.reduce((res, { name }) => ({ ...res, [name]: yup.mixed().required('選択してください') }), {})
  ),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormCustomSelect;