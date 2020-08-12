import { FC, useCallback, FocusEvent } from 'react';
import InputWithIcon, { InputWithIconProps } from './InputWithIcon';
import { useField } from 'formik'

const removeSpace = (value: string): string => value.replace(/[\s]/g, '');

const InputName: FC<InputWithIconProps> = ({ innerRef, ...props }) => {
  const [field, , { setValue }] = useField(props)
  const handleBuler = useCallback((e: FocusEvent<HTMLInputElement>) => {
    field.onBlur(e)
    setValue(removeSpace(e.target.value))
  }, [field.onBlur, setValue])

  return (
    <InputWithIcon type="text" {...field} {...props} innerRef={innerRef} onBlur={handleBuler} />
  );
};

export default InputName;
