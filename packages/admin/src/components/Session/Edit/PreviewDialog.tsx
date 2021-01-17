import { FC, useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { useFormState } from 'react-final-form'
import { Session } from '@botui/types'
import { Preview } from '@botui/chat-controller'

const useStyleDialog = makeStyles(() => ({
  paper: {
    width: 375,
    height: 812
  }
}))

const useStyleDialogContent = makeStyles(() => ({
  root: {
    padding: 0,
    '&:first-child': {
      paddingTop: 0
    }
  }
}))

const PreviewDialog: FC = () => {
  const { values } = useFormState<Session>()
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const dialogClasses = useStyleDialog()
  const dialogContentClasses = useStyleDialogContent()
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Visibility />
      </IconButton>
      <Dialog open={open} onClose={handleClose} classes={dialogClasses}>
        <DialogContent classes={dialogContentClasses}>
          <Preview
            proposals={values.proposals}
            chatConfig={{
              ...values,
              messages: [],
              messagesCount: values.proposals.length,
              onClose: () => setTimeout(handleClose, 3000)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewDialog
