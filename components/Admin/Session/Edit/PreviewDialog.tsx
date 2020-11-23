import dynamic from 'next/dynamic'
import { FC, useState } from 'react'
import { Dialog, DialogContent, Button, makeStyles } from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { useFormState } from 'react-final-form'
import { Session } from '../../../../@types/session'

const Preview = dynamic(() => import('../../../Chat/Preview'), { ssr: false })

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
  const dialogClasses = useStyleDialog()
  const dialogContentClasses = useStyleDialogContent()
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Visibility />
        プレビュー
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        classes={dialogClasses}
      >
        <DialogContent classes={dialogContentClasses}>
          <Preview
            proposals={values.proposals}
            chatConfig={{
              ...values,
              messages: values.proposals,
              messagesCount: values.proposals.length
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewDialog