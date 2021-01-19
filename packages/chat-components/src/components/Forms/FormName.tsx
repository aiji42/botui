/** @jsxImportSource @emotion/react */
import React, { useEffect, FC, KeyboardEvent, useRef } from 'react'
import { withFormik, Field, ErrorMessage, useField, FormikProps } from 'formik'
import * as yup from 'yup'
import InputName from './Elements/InputName'
import InputNameKana from './Elements/InputNameKana'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import { css } from '@emotion/react'
import { useKana } from 'react-use-kana'
import { customHandleSubmit } from './modules'
import {
  FormNameValues,
  FormName as FormNameType
} from '@botui/types'

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

const Form: FC<FormikProps<FormNameValues>> = (props) => {
  const { handleSubmit, status } = props
  const {
    kana: familyNameKana,
    setKanaSource: setFamilyNameKanaSource
  } = useKana({ kanaType: status.kanaType })
  const {
    kana: firstNameKana,
    setKanaSource: setFirstNameKanaSource
  } = useKana({ kanaType: status.kanaType })
  const [, , familyNameKanaHelper] = useField('familyNameKana')
  const [, , firstNameKanaHelper] = useField('firstNameKana')
  const FamilyNameMounted = useRef(false)
  const FirstNameMounted = useRef(false)

  useEffect(() => {
    if (!FamilyNameMounted.current) {
      FamilyNameMounted.current = true
      return
    }
    if (!status.kana) return
    familyNameKanaHelper.setValue(familyNameKana)
    !!familyNameKana && familyNameKanaHelper.setTouched(true)
  }, [familyNameKana])

  useEffect(() => {
    if (!FirstNameMounted.current) {
      FirstNameMounted.current = true
      return
    }
    if (!status.kana) return
    firstNameKanaHelper.setValue(firstNameKana)
    !!firstNameKana && firstNameKanaHelper.setTouched(true)
  }, [firstNameKana])

  return (
    <form onSubmit={handleSubmit}>
      <div css={[style.formBlockDetailHalf, style.left]}>
        <Field
          as={InputName}
          name="familyName"
          placeholder="山田"
          title="姓"
          autoFocus
          onInput={(e: KeyboardEvent<HTMLInputElement>) =>
            setFamilyNameKanaSource(e.currentTarget.value)
          }
        />
        <ErrorMessage name="familyName" component={SpanErrorMessage} />
      </div>
      <div css={style.formBlockDetailHalf}>
        <Field
          as={InputName}
          name="firstName"
          placeholder="太郎"
          title="名"
          onInput={(e: KeyboardEvent<HTMLInputElement>) =>
            setFirstNameKanaSource(e.currentTarget.value)
          }
        />
        <ErrorMessage name="firstName" component={SpanErrorMessage} />
      </div>
      {status.kana && (
        <>
          <div css={[style.formBlockDetailHalf, style.left]}>
            <Field
              as={InputNameKana}
              name="familyNameKana"
              kanaType={status.kanaType}
              placeholder={status.kanaType === 'katakana' ? 'ヤマダ' : 'やまだ'}
              title={status.kanaType === 'katakana' ? 'セイ' : 'せい'}
            />
            <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
          </div>
          <div css={style.formBlockDetailHalf}>
            <Field
              as={InputNameKana}
              name="firstNameKana"
              kanaType={status.kanaType}
              placeholder={status.kanaType === 'katakana' ? 'タロウ' : 'たろう'}
              title={status.kanaType === 'katakana' ? 'メイ' : 'めい'}
            />
            <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
          </div>
        </>
      )}
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormName = withFormik<FormNameType, FormNameValues>({
  mapPropsToValues: ({ values }) => ({
    familyName: '',
    familyNameKana: '',
    firstName: '',
    firstNameKana: '',
    ...values
  }),
  validationSchema: ({ status }: FormNameType) => {
    const defaultValidate = {
      familyName: yup
        .string()
        .required('入力してください')
        .max(50, '入力内容が長すぎます'),
      firstName: yup
        .string()
        .required('入力してください')
        .max(50, '入力内容が長すぎます')
    }
    const regex = status.kanaType === 'katakana' ? /^[ァ-ン]+$/ : /^[ぁ-ん]+$/
    const kanaValidate = {
      familyNameKana: yup
        .string()
        .required('入力してください')
        .max(50, '入力内容が長すぎます')
        .matches(
          regex,
          `全角${
            status.kanaType === 'katakana' ? 'カナ' : 'かな'
          }で入力してください`
        ),
      firstNameKana: yup
        .string()
        .required('入力してください')
        .max(50, '入力内容が長すぎます')
        .matches(
          regex,
          `全角${
            status.kanaType === 'katakana' ? 'カナ' : 'かな'
          }で入力してください`
        )
    }
    const validateShape = !status.kana
      ? defaultValidate
      : { ...defaultValidate, ...kanaValidate }

    return yup.object().shape(validateShape)
  },
  mapPropsToStatus: ({ status }) => status,
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormName
