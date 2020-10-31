import { FC, useCallback, useEffect, useState } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleFormProps,
  useInput,
  InputProps,
  required,
  TextFieldProps,
  Labeled,
  Identifier,
  RadioButtonGroupInput,
  FormDataConsumer,
  FormWithRedirect,
  SaveButton
} from 'react-admin'
import { Color, ColorPicker } from 'material-ui-color'
import {
  TextField as TextInputMU,
  Grid,
  makeStyles,
  Toolbar,
  Box,
  Button
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import isColor from 'is-color'
import { useForm, useField } from 'react-final-form'
import { Storage } from 'aws-amplify'
import { DropzoneDialog } from 'material-ui-dropzone'
import SimplePreview from './SimplePreview'

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

const useStyles = makeStyles((theme) => ({
  image: {
    height: 100,
    width: 'initial',
    maxWidth: '100%'
  }
}))

const ImageInput: FC<InputProps<TextFieldProps>> = (props) => {
  const classes = useStyles()
  const { source, label } = props
  const {
    input: { value }
  } = useField(source)
  const {
    input: { value: sessionId }
  } = useField<Identifier>('id')
  const { change } = useForm()
  const [src, setSrc] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [])
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleSave = useCallback(
    async ([file]: File[]) => {
      const res = await Storage.put(`${sessionId}/${file.name}`, file, {
        level: 'public'
      })
      change(source, (res as { key: string }).key)
      handleClose()
    },
    [change, handleClose, sessionId]
  )

  useEffect(() => {
    if (!value) return
    Storage.get(value, { level: 'public' }).then(
      (val) => typeof val === 'string' && setSrc(val)
    )
  }, [value])

  return (
    <Labeled label={label} fullWidth>
      <>
        <Grid item xs={5}>
          {src && <img src={src} className={classes.image} />}
          <Button onClick={handleOpen}>
            {src ? (
              '変更'
            ) : (
              <>
                <AddIcon />
                追加
              </>
            )}
          </Button>
          <DropzoneDialog
            acceptedFiles={['image/*']}
            cancelButtonText="cancel"
            submitButtonText="submit"
            maxFileSize={500000}
            open={open}
            onClose={handleClose}
            onSave={handleSave}
            filesLimit={1}
            previewGridProps={{
              container: { justify: 'center' },
              item: { xs: 8 }
            }}
            showAlerts={['error']}
            dialogTitle={label}
            previewText=""
          />
        </Grid>
      </>
    </Labeled>
  )
}

const EditSessionForm: FC<Omit<SimpleFormProps, 'children'>> = (props) => {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box p={2}>
                <TextInput source="title" resource="sessions" />
                <BooleanInput source="active" resource="sessions" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={2}>
                <ColorInput
                  source="theme.header.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ヘッダー"
                />
                <ColorInput
                  source="theme.agent.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="オペレーターメッセージバルーン"
                />
                <ColorInput
                  source="theme.agent.color"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="オペレーターメッセージ"
                />
                <ColorInput
                  source="theme.user.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ユーザメッセージバルーン"
                />
                <ColorInput
                  source="theme.user.color"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="ユーザーメッセージ"
                />
                <ColorInput
                  source="theme.footer.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="フッター"
                />
                <ColorInput
                  source="theme.progressBar.backgroundColor"
                  resource="sessions"
                  validate={[required(), colorValidator]}
                  label="プログレスバー"
                />
                <ImageInput
                  source="images.logo.key"
                  resource="sessions"
                  label="ヘッダーロゴ"
                />
                <RadioButtonGroupInput
                  source="images.agent"
                  resource="sessions"
                  initialValue="/operator_female1.jpg"
                  label="オペレーターアイコン"
                  row
                  fullWidth
                  choices={[
                    { id: '/operator_female1.jpg', name: '女性1' },
                    { id: '/operator_female2.jpg', name: '女性2' },
                    { id: '/operator_female3.jpg', name: '女性3' },
                    { id: '/operator_male1.jpg', name: '男性1' },
                    { id: '/operator_bot1.jpg', name: 'ボット' }
                  ]}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormDataConsumer>
                {({ formData }) => (
                  <Labeled label="プレビュー">
                    <SimplePreview {...formData} />
                  </Labeled>
                )}
              </FormDataConsumer>
            </Grid>
          </Grid>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <SaveButton
                saving={formProps.saving}
                invalid={formProps.invalid}
                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
              />
            </Box>
          </Toolbar>
        </form>
      )}
    />
  )
}

export default EditSessionForm
