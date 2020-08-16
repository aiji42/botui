import React, { useEffect, FC, KeyboardEvent } from 'react';
import { withFormik, Field, ErrorMessage, useField, FormikProps, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { dataStore, saveStoreValue } from '../../../../dataStore';
import InputName from '../Elements/InputName';
import InputNameKana from '../Elements/InputNameKana';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { useKana } from 'react-use-kana'

const style = {
  formBlockDetailHalf: css`
    display: inline-block;
    vertical-align: top;
    margin-bottom: 3px;
    width: 49%;
  `,
  left: css`
    margin-right: 3px;
  `
}


type Values = {
  familyName: string
  familyNameKana: string
  firstName: string
  firstNameKana: string
  [key: string]: string
}

const toKatakana = (value: string) => value.normalize('NFKC')
  .replace(/[\u3041-\u3096]/g, (match) => String.fromCharCode(match.charCodeAt(0) + 0x60))
  .replace(/[^ァ-ン]/g, '')

const Form: FC<FormikProps<Values>> = (props) => {
  const { handleSubmit } = props;
  const { kana: familyNameKana, setKanaSource: setFamilyNameKanaSource } = useKana()
  const { kana: firstNameKana, setKanaSource: setFirstNameKanaSource } = useKana()
  const [, , { setValue: setFamilyNameKana }] = useField('familyNameKana')
  const [, , { setValue: setFirstNameKana }] = useField('firstNameKana')

  useEffect(() => { setFamilyNameKana(toKatakana(familyNameKana)) }, [familyNameKana, setFamilyNameKana])
  useEffect(() => { setFirstNameKana(toKatakana(firstNameKana)) }, [firstNameKana, setFirstNameKana])

  return (
    <form onSubmit={handleSubmit}>
      <div css={[style.formBlockDetailHalf, style.left]}>
        <Field component={InputName} name="familyName" placeholder="山田" title="姓" autoFocus
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => setFamilyNameKanaSource(e.currentTarget.value)}
        />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalf}>
        <Field component={InputName} name="firstName" placeholder="太郎" title="名"
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => setFirstNameKanaSource(e.currentTarget.value)}
        />
        <ErrorMessage name="firstName" component={SpanErrorMessage} />
      </div>
      <div css={[style.formBlockDetailHalf, style.left]}>
        <Field component={InputNameKana} name="familyNameKana" placeholder="ヤマダ" title="セイ" />
        <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalf}>
        <Field component={InputNameKana} name="firstNameKana" placeholder="タロウ" title="メイ" />
        <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
      </div>
      <Field component={ButtonSubmit} />
    </form>
  );
};

type FormikBag = {
  props: {
    onSubmited: () => void
    onUpdate: () => void
  }
} & FormikHelpers<Values>

const FormName = withFormik({
  mapPropsToValues: () => ({
    familyName: '',
    familyNameKana: '',
    firstName: '',
    firstNameKana: '',
  }),
  validationSchema: yup.object().shape({
    familyName: yup.string().required('入力してください').max(50, '入力内容が長すぎます'),
    familyNameKana: yup.string()
      .required('入力してください')
      .max(50, '入力内容が長すぎます')
      .matches(/^[ァ-ヶ]+$/, '全角カナで入力してください'),
    firstName: yup.string().required('入力してください').max(50, '入力内容が長すぎます'),
    firstNameKana: yup.string()
      .required('入力してください')
      .max(50, '入力内容が長すぎます')
      .matches(/^[ァ-ヶ]+$/, '全角カナで入力してください'),
  }),
  validateOnMount: true,
  handleSubmit: (values: Values, { props, setSubmitting }: FormikBag) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => saveStoreValue(key, values[key]));
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(Form);

export default FormName;