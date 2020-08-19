import { FC, useMemo } from 'react';
import { withFormik, Field, ErrorMessage, FormikProps } from 'formik';
import * as yup from 'yup';
import SelectWithIcon from '../Elements/SelectWithIcon';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { customHandleSubmit, HandleSubmitProps } from './modules'

const style = {
  formBlockDetailHalfField: css`
    display: inline-block;
    vertical-align: top;
    margin-bottom: 2px;
    width: 49%;
  `,
  left: css`
    margin-right: 3px;
  `
}

interface Values {
  birthdayYear: string
  birthdayMonth: string
  birthdayDay: string
}

const Form: FC<FormikProps<Values> & HandleSubmitProps> = (props) => {
  const { handleSubmit } = props;
  const years = useMemo(() => {
    const y = [...Array(100)].map((_, k) => new Date().getFullYear() - k)
    return [...y.slice(0, 35), '', ...y.slice(35)].reverse()
  }, [])
  const monthes = useMemo(() => [...Array(12)].map((_, k) => k + 1), [])
  const days = useMemo(() => [...Array(31)].map((_, k) => k + 1), [])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={SelectWithIcon} name="birthdayYear" title="年">
        {years.map((year) => (<option key={year} value={year}>{year !== '' ? `${year}年` : year}</option>))}
      </Field>
      <ErrorMessage name="birthdayYear" component={SpanErrorMessage} />

      <div css={[style.formBlockDetailHalfField, style.left]}>
        <Field component={SelectWithIcon} name="birthdayMonth" title="月">
          <option value=""></option>
          {monthes.map((month) => (<option key={month} value={month}>{month}月</option>))}
        </Field>
        <ErrorMessage name="birthdayMonth" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalfField}>
        <Field component={SelectWithIcon} name="birthdayDay" title="日">
          <option value=""></option>
          {days.map((day) => (<option key={day} value={day}>{day}日</option>))}
        </Field>
        <ErrorMessage name="birthdayDay" component={SpanErrorMessage} />
      </div>
      <Field component={ButtonSubmit} />
    </form>
  );
};

const FormBirthDay = withFormik<HandleSubmitProps, Values>({
  mapPropsToValues: () => ({
    birthdayYear: '',
    birthdayMonth: '',
    birthdayDay: '',
  }),
  validationSchema: yup.object().shape({
    birthdayYear: yup.string().required('選択してください'),
    birthdayMonth: yup.string().required('選択してください'),
    birthdayDay: yup.string().required('選択してください'),
  }),
  validate: (values: Values) => {
    const { birthdayYear, birthdayMonth, birthdayDay } = values;
    const date = new Date(Number(birthdayYear), Number(birthdayMonth) - 1, Number(birthdayDay));
    if (!!birthdayYear && !!birthdayMonth && !!birthdayDay && String(date.getMonth() + 1) !== birthdayMonth) {
      return { birthdayYear: '存在しない日付です', birthdayMonth: true, birthdayDay: true };
    }
    return {};
  },
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form);

export default FormBirthDay;