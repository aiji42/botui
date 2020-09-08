import { FC, useCallback } from 'react'
import { useField } from 'formik'
import InputWithIcon, { InputWithIconProps } from './InputWithIcon'

const onlyNum = (value: string | number): string =>
  `${value}`.normalize('NFKC').replace(/[^0-9]/g, '')

const InputNumber: FC<InputWithIconProps> = (props) => {
  const [field, , helpers] = useField(props.name)
  const { setValue } = helpers
  const { onChange } = field
  const handleChange = useCallback(
    (e) => {
      onChange(e)
      setValue(onlyNum(e.target.value))
    },
    [onChange, setValue]
  )

  return <InputWithIcon type="tel" {...props} onChange={handleChange} />
}

export default InputNumber
