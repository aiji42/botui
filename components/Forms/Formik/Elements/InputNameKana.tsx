import { FC, useCallback, FocusEvent } from 'react'
import InputWithIcon, { InputWithIconProps } from './InputWithIcon'
import { useField } from 'formik'

const toKatakana = (value: string): string =>
  value
    .normalize('NFKC')
    .replace(/[\u3041-\u3096]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    )
    .replace(/[^ァ-ン]/g, '')

const toHiragana = (value: string): string =>
  value
    .normalize('NFKC')
    .replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    )
    .replace(/[^ぁ-ん]/g, '')

interface InputNameKanaProps extends InputWithIconProps {
  kanaType?: 'katakana' | 'hiragana'
}

const InputNameKana: FC<InputNameKanaProps> = ({
  innerRef,
  kanaType,
  ...props
}) => {
  const [field, , { setValue }] = useField(props)
  const handleBuler = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      field.onBlur(e)
      setValue(
        kanaType === 'katakana'
          ? toKatakana(e.target.value)
          : toHiragana(e.target.value)
      )
    },
    [field.onBlur, setValue]
  )

  return (
    <InputWithIcon
      type="text"
      innerRef={innerRef}
      {...props}
      onBlur={handleBuler}
    />
  )
}

export default InputNameKana
