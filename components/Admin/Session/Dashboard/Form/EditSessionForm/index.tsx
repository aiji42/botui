import { FC, useCallback, useEffect, useState } from 'react'
import {
  TextInput,
  BooleanInput,
  SimpleForm,
  SimpleFormProps,
  useInput,
  InputProps,
  required,
  TextFieldProps,
  Labeled
} from 'react-admin'
import { Color, ColorPicker } from 'material-ui-color'
import {
  TextField as TextInputMU,
  Grid,
  makeStyles,
  Fab
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import isColor from 'is-color'
import { useForm, useField } from 'react-final-form'
import { Storage, Auth } from 'aws-amplify'
import { DropzoneDialog } from 'material-ui-dropzone'

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
  imageContainer: {
    position: 'relative',
    '&:hover $image': {
      opacity: 0.3
    },
    '&:hover $removeButton': {
      opacity: 1
    }
  },
  image: {
    height: 100,
    width: 'initial',
    maxWidth: '100%',
    opacity: 1
  },
  removeButton: {
    transition: '.5s ease',
    position: 'absolute',
    opacity: 0,
    top: theme.spacing(-1),
    right: theme.spacing(-1),
    '&:focus': {
      opacity: 1
    }
  }
}))

const ImageInput: FC<InputProps<TextFieldProps>> = (props) => {
  const classes = useStyles()
  const { source, label } = props
  const {
    input: { value }
  } = useField(source)
  const { change } = useForm()
  const [src, setSrc] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [])
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleSave = useCallback(
    async ([file]: File[]) => {
      const currentCredentials = await Auth.currentCredentials()
      const identityId = currentCredentials.identityId
      // TODO: sessionId を path に含ませる
      const res = await Storage.put(`${identityId}/${file.name}`, file, {
        level: 'public'
      })
      change(source, (res as { key: string }).key)
      handleClose()
    },
    [change, handleClose]
  )

  useEffect(() => {
    Storage.get(value, { level: 'public' }).then(
      (val) => typeof val === 'string' && setSrc(val)
    )
  }, [value])

  return (
    <Labeled label={label} fullWidth>
      <>
        <Grid item xs={5} className={classes.imageContainer}>
          <img src={src} className={classes.image} />
          <Fab
            onClick={handleOpen}
            className={classes.removeButton}
            size="medium"
          >
            <EditIcon />
          </Fab>
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
      <ImageInput source="images.logo" label="ヘッダーロゴ" />
      <ImageInput source="images.agent" label="エージェントアイコン" />
    </SimpleForm>
  )
}

export default EditSessionForm
