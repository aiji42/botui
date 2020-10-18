import { FC, useCallback } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  SimpleFormProps,
  useInput,
  InputProps,
  required,
  TextFieldProps
} from 'react-admin'
import { Color, ColorPicker } from 'material-ui-color'
import { TextField as TextInputMU } from '@material-ui/core'
import { useForm } from 'react-final-form'

const ColorInput: FC<InputProps<TextFieldProps>> = (props) => {
  const {
    input: { name, onChange, value, ...rest },
    meta: { touched, error },
    isRequired
  } = useInput(props)
  const { change } = useForm()
  const handleChange = useCallback(
    (color: Color) => {
      change(name, `#${color.hex}`)
    },
    [change]
  )
  // TODO: カスタムバリデーション

  return (
    <>
      <ColorPicker
        value={value}
        hideTextfield
        disableAlpha
        onChange={handleChange}
      />
      <TextInputMU
        name={name}
        label={props.label}
        onChange={onChange}
        error={!!(touched && error)}
        helperText={touched && error}
        required={isRequired}
        value={value}
        {...rest}
      />
    </>
  )
}

const EditSessionForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" />
      <BooleanInput source="active" />
      <ColorInput
        source="theme.headerColor"
        validate={[required()]}
        label="ヘッダーカラー"
      />
    </SimpleForm>
  )
}

export default EditSessionForm
