import { FC, useCallback } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  SimpleFormProps,
  useInput,
  InputProps,
  required,
  TextFieldProps,
  ImageInput,
  ImageField,
  FormDataConsumer
} from 'react-admin'
import { Color, ColorPicker } from 'material-ui-color'
import { TextField as TextInputMU, Grid } from '@material-ui/core'
import { useForm } from 'react-final-form'
import isColor from 'is-color'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import { AccessLevel } from '@aws-amplify/ui-components'

const colorValidator = (color: string) => {
  return isColor(color) ? null : '入力内容が間違っています'
}

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

  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        <ColorPicker
          value={value}
          hideTextfield
          disableAlpha
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={11}>
        <TextInputMU
          name={name}
          label={props.label}
          onChange={onChange}
          error={!!(touched && error)}
          helperText={touched && error ? error : ' '}
          required={isRequired}
          value={value}
          {...rest}
        />
      </Grid>
    </Grid>
  )
}

const EditSessionForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput source="title" />
      <BooleanInput source="active" />
      <ColorInput
        source="theme.header.backgroundColor"
        validate={[required(), colorValidator]}
        label="ヘッダー"
      />
      <ColorInput
        source="theme.agent.backgroundColor"
        validate={[required(), colorValidator]}
        label="オペレーターメッセージバルーン"
      />
      <ColorInput
        source="theme.agent.color"
        validate={[required(), colorValidator]}
        label="オペレーターメッセージ"
      />
      <ColorInput
        source="theme.user.backgroundColor"
        validate={[required(), colorValidator]}
        label="ユーザメッセージバルーン"
      />
      <ColorInput
        source="theme.user.color"
        validate={[required(), colorValidator]}
        label="ユーザーメッセージ"
      />
      <ColorInput
        source="theme.footer.backgroundColor"
        validate={[required(), colorValidator]}
        label="フッター"
      />
      <ColorInput
        source="theme.progress.backgroundColor"
        validate={[required(), colorValidator]}
        label="プログレスバー"
      />
      <ImageInput
        source="uploadableImages.logo"
        accept="image/*"
        maxSize={500000}
        label="ヘッダーロゴ"
      >
        <ImageField source="src" title="logo" />
      </ImageInput>
      <FormDataConsumer>
        {({ formData }) => (
          <AmplifyS3Image
            imgKey={formData.images.logo}
            level={AccessLevel.Protected}
          />
        )}
      </FormDataConsumer>
      <ImageInput
        source="uploadableImages.agent"
        accept="image/*"
        maxSize={500000}
        label="エージェントアイコン"
      >
        <ImageField source="src" title="agent" />
      </ImageInput>
      <FormDataConsumer>
        {({ formData }) => (
          <AmplifyS3Image
            imgKey={formData.images.agent}
            level={AccessLevel.Protected}
          />
        )}
      </FormDataConsumer>
    </SimpleForm>
  )
}

export default EditSessionForm
