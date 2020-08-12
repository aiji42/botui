import { FC, useCallback, FocusEvent } from 'react';
import InputWithIcon, { InputWithIconProps } from './InputWithIcon';
import { useField } from 'formik'

const toKatakana = (value: string): string => value.normalize('NFKC')
  .replace(/[\u3041-\u3096]/g, (match) => String.fromCharCode(match.charCodeAt(0) + 0x60))
  .replace(/[^ァ-ン]/g, '')

const InputNameKana: FC<InputWithIconProps> = ({ innerRef, ...props }) => {
  const [field, , { setValue }] = useField(props)
  const handleBuler = useCallback((e: FocusEvent<HTMLInputElement>) => {
    field.onBlur(e)
    setValue(toKatakana(e.target.value))
  }, [field.onBlur, setValue])

  return (
    <InputWithIcon type="text" {...field} innerRef={innerRef} {...props} onBlur={handleBuler} />
  );
};

export default InputNameKana;
