import { FC, useRef, useEffect } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps, useField } from 'formik'
import * as yup from 'yup'
import InputNumber from '../Elements/InputNumber'
import SelectWithIcon from '../Elements/SelectWithIcon'
import InputWithIcon from '../Elements/InputWithIcon'
import SpanErrorMessage from '../Elements/SpanErrorMessage'
import ButtonSubmit from '../Elements/ButtonSubmit'
import { usePostalJp } from 'use-postal-jp'
import { customHandleSubmit } from './modules'
import { FormAddressValues, FormAddress as FormAddressType } from '@botui/types'

const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]

const Form: FC<FormikProps<FormAddressValues>> = (props) => {
  const { handleSubmit } = props

  const {
    address,
    sanitizedCode,
    error: postalError,
    pending,
    setPostalCode
  } = usePostalJp()
  const [, postalCodeMeta, postalCodeHelper] = useField('postalCode')
  const [, , prefHelper] = useField('pref')
  const [, , cityHelper] = useField('city')

  const inputStreetEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { prefectureCode, address1, address2, address3, address4 } = address
    if (prefectureCode) prefHelper.setValue(prefectureCode)
    if (address1) cityHelper.setValue(address1 + address2 + address3 + address4)
  }, [address])

  useEffect(() => {
    setPostalCode(postalCodeMeta.value)
  }, [setPostalCode, postalCodeMeta.value])

  useEffect(() => {
    if (sanitizedCode.length !== 7) return
    postalCodeHelper.setValue(sanitizedCode)
    !pending && !postalError && inputStreetEl.current?.focus()
  }, [sanitizedCode, postalError, pending])

  return (
    <form onSubmit={handleSubmit}>
      <Field
        as={InputNumber}
        name="postalCode"
        placeholder="1500002"
        title="郵便番号"
        autoFocus
      />
      <ErrorMessage name="postalCode" component={SpanErrorMessage} />

      <Field as={SelectWithIcon} name="pref" title="都道府県">
        <option value=""></option>
        {prefectures.map((title, index) => (
          <option key={index + 1} value={index + 1}>
            {title}
          </option>
        ))}
      </Field>
      <ErrorMessage name="pref" component={SpanErrorMessage} />

      <Field
        as={InputWithIcon}
        type="text"
        placeholder="〇〇市〇〇町"
        name="city"
        title="市区町村"
      />
      <ErrorMessage name="city" component={SpanErrorMessage} />

      <Field
        as={InputWithIcon}
        type="text"
        placeholder="1-2-3"
        innerRef={inputStreetEl}
        name="street"
        title="番地・マンション名・部屋番号"
      />
      <ErrorMessage name="street" component={SpanErrorMessage} />

      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormAddress = withFormik<FormAddressType, FormAddressValues>({
  mapPropsToValues: ({ values }) => ({
    postalCode: '',
    pref: '',
    city: '',
    street: '',
    ...values
  }),
  validationSchema: yup.object().shape({
    postalCode: yup
      .string()
      .required('入力してください')
      .matches(/^\d{7}$/, '7桁の数字で正しく入力してください'),
    pref: yup.string().required('選択してください'),
    city: yup
      .string()
      .required('入力してください')
      .max(200, '入力内容が長すぎます'),
    street: yup
      .string()
      .required('入力してください')
      .max(200, '入力内容が長すぎます')
  }),
  validateOnMount: true,
  handleSubmit: customHandleSubmit
})(Form)

export default FormAddress
