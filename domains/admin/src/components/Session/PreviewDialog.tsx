import { FC, useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  makeStyles,
  Button
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
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

interface PreviewDialogProps {
  session: Session
}

const PreviewDialog: FC<PreviewDialogProps> = ({ session }) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const dialogClasses = useStyleDialog()
  const dialogContentClasses = useStyleDialogContent()
  return (
    <>
      <Button startIcon={<Visibility />} onClick={() => setOpen(true)}>
        プレビュー
      </Button>
      <Dialog open={open} onClose={handleClose} classes={dialogClasses}>
        <DialogContent classes={dialogContentClasses}>
          <Preview
            proposals={session.proposals}
            chatConfig={{
              ...session,
              messages: [],
              percentOfProgress: 0,
              onClose: () => setTimeout(handleClose, 3000)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewDialog
