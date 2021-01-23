import { FC, useCallback, useEffect, useState } from 'react'
import { InputProps, TextFieldProps, Labeled, Identifier } from 'react-admin'
import { Grid, makeStyles, Button, Typography } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { useForm, useField, Field } from 'react-final-form'
import { DropzoneDialog } from 'material-ui-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { getStorageUrl, storePublic } from '@botui/api'

const randomizedFileName = (originalFileName: string): string =>
  `${uuidv4()}.${originalFileName.split('.').slice(-1)[0]}`

const useStyles = makeStyles(() => ({
  image: {
    height: 100,
    width: 'initial',
    maxWidth: '100%'
  }
}))

interface Props extends InputProps<TextFieldProps> {
  sessionId: Identifier
  required?: boolean
}

const ImageInput: FC<Props> = (props) => {
  const classes = useStyles()
  const { source, label, required = false } = props
  const {
    input: { value },
    meta: { error, touched }
  } = useField(source)
  const { change } = useForm()
  const [src, setSrc] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [])
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleSave = useCallback(
    async ([file]: File[]) => {
      const res = await storePublic(`${props.sessionId}/${randomizedFileName(file.name)}`, file)
      change(source, res.key)
      handleClose()
    },
    [change, handleClose, props.sessionId, source]
  )
  const validate = useCallback(
    (value: string) => (required && !value ? '必須' : ''),
    [required]
  )

  useEffect(() => {
    if (!value) return
    getStorageUrl(value).then(setSrc)
  }, [value])

  return (
    <Labeled label={label} fullWidth>
      <>
        <Grid item xs={5}>
          <Button onClick={handleOpen}>
            {src ? (
              <img src={src} className={classes.image} alt="logo" />
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
              container: { justify: 'center' }
            }}
            showAlerts={['error']}
            dialogTitle={label}
            previewText=""
            showFileNamesInPreview={false}
          />
          <Field
            validate={validate}
            name={source}
            type="hidden"
            component="input"
          />
          {error && touched && (
            <Typography variant="caption" color="error" component="div">
              {error}
            </Typography>
          )}
        </Grid>
      </>
    </Labeled>
  )
}

export default ImageInput
