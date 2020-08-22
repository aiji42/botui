import React, { useEffect, FC, KeyboardEvent, useReducer } from 'react';
import { withFormik, Field, ErrorMessage, useField, FormikProps } from 'formik';
import * as yup from 'yup';
import InputName from '../Elements/InputName';
import InputNameKana from '../Elements/InputNameKana';
import SpanErrorMessage from '../Elements/SpanErrorMessage';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import historyKana from 'historykana'
import { customHandleSubmit, HandleSubmitProps } from './modules'

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

const toKatakana = (value: string) => value.normalize('NFKC')
  .replace(/[\u3041-\u3096]/g, (match) => String.fromCharCode(match.charCodeAt(0) + 0x60))
  .replace(/[^ァ-ン]/g, '')

interface Values {
  familyName: string
  familyNameKana: string
  firstName: string
  firstNameKana: string
}

const reducer = (state: string[], input: string) => {
  return [...state, input]
}

const Form: FC<FormikProps<Values> & HandleSubmitProps> = (props) => {
  const { handleSubmit } = props;
  const [, , familyNameKanaHelper] = useField('familyNameKana')
  const [, , firstNameKanaHelper] = useField('firstNameKana')
  const [familyNameHistory, pushFamilyNameHistory] = useReducer(reducer, [])
  const [firstNameHistory, pushFirstNameHistory] = useReducer(reducer, [])

  useEffect(() => {
    familyNameKanaHelper.setValue(toKatakana(historyKana(familyNameHistory)))
    familyNameHistory.length && familyNameKanaHelper.setTouched(true)
  }, [familyNameHistory])

  useEffect(() => {
    firstNameKanaHelper.setValue(toKatakana(historyKana(firstNameHistory)))
    firstNameHistory.length && firstNameKanaHelper.setTouched(true)
  }, [firstNameHistory])

  return (
    <form onSubmit={handleSubmit}>
      <div css={[style.formBlockDetailHalf, style.left]}>
        <Field as={InputName} name="familyName" placeholder="山田" title="姓" autoFocus
          onInput={(e: KeyboardEvent<HTMLInputElement>) => pushFamilyNameHistory(e.currentTarget.value)}
        />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalf}>
        <Field as={InputName} name="firstName" placeholder="太郎" title="名"
          onInput={(e: KeyboardEvent<HTMLInputElement>) => pushFirstNameHistory(e.currentTarget.value)}
        />
        <ErrorMessage name="firstName" component={SpanErrorMessage} />
      </div>
      <div css={[style.formBlockDetailHalf, style.left]}>
        <Field as={InputNameKana} name="familyNameKana" placeholder="ヤマダ" title="セイ" />
        <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalf}>
        <Field as={InputNameKana} name="firstNameKana" placeholder="タロウ" title="メイ" />
        <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
      </div>
      <Field as={ButtonSubmit} name="submit" />
    </form>
  );
};

const FormName = withFormik<HandleSubmitProps, Values>({
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
  handleSubmit: customHandleSubmit
})(Form);

export default FormName;