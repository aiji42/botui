import { FC, useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core'
import { Proposal } from '@botui/types'
import ProposalForm from './ProposalForm'

interface Props {
  proposal: Proposal
  open: boolean
  handleClose: () => void
  handleSave: (proposal: Proposal) => void
}

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: '95%'
  },
  content: {
    width: theme.spacing(90),
    maxWidth: '100%'
  }
}))

const ProposalEditDialog: FC<Props> = (props) => {
  const [trySubmit, setTrySubmit] = useState<boolean>(false)
  const [submittable, setSubmittable] = useState<boolean>(false)
  const handleClickSave = useCallback(() => setTrySubmit(true), [setTrySubmit])
  const classes = useStyle()

  return (
    <Dialog open={props.open} classes={{ paper: classes.root }}>
      <DialogContent className={classes.content}>
        <ProposalForm
          initialValues={props.proposal}
          onSubmit={props.handleSave}
          trySubmit={trySubmit}
          handleSubmittable={setSubmittable}
          handleTrySubmit={setTrySubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="default">
          cancel
        </Button>
        <Button
          onClick={handleClickSave}
          disabled={!submittable}
          variant="contained"
          color="primary"
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProposalEditDialog
