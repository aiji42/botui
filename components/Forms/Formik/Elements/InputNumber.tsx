import { FC, useCallback } from 'react';
import { useField } from 'formik'
import InputWithIcon, { InputWithIconProps } from './InputWithIcon';

const onlyNum = (value: string | number): string => `${value}`.normalize('NFKC').replace(/[^0-9]/g, '');

const InputNumber: FC<InputWithIconProps> = ({ name, ...props }) => {
  const [field,, helpers] = useField(name);
  const { setValue } = helpers
  const { onChange } = field
  const handleChange = useCallback((e) => {
    onChange(e)
    setValue(onlyNum(e.target.value))
  }, [onChange, setValue])

  return <InputWithIcon {...field} type="tel" onChange={handleChange} {...props} />
};

export default InputNumber;