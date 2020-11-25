import { FC, useCallback, useEffect, useState } from 'react'
import {
  InputProps,
  TextFieldProps,
  Labeled,
  Identifier,
  TextInput,
  required
} from 'react-admin'
import { Grid, makeStyles, Button } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { useForm, useField } from 'react-final-form'
import { Storage } from 'aws-amplify'
import { DropzoneDialog } from 'material-ui-dropzone'
import { v4 as uuidv4 } from 'uuid'

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
}

const ImageInput: FC<Props> = (props) => {
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
      const res = await Storage.put(
        `${props.sessionId}/${randomizedFileName(file.name)}`,
        file,
        {
          level: 'public'
        }
      )
      change(source, (res as { key: string }).key)
      handleClose()
    },
    [change, handleClose, props.sessionId]
  )

  useEffect(() => {
    if (!value) return
    Storage.get(value, { level: 'public' }).then(
      (val) => typeof val === 'string' && setSrc(val)
    )
  }, [value])

  return (
    <Labeled label={label} fullWidth>
      <Grid item xs={5}>
        <Button onClick={handleOpen}>
          {src ? (
            <img src={src} className={classes.image} />
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
      </Grid>
    </Labeled>
  )
}

export default ImageInput
