import { FC, useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import { Proposal } from '@botui/types'
import ProposalForm from './ProposalForm'

interface Props {
  proposal: Proposal
  open: boolean
  handleClose: () => void
  handleSave: (proposal: Proposal) => void
}

const ProposalEditDialog: FC<Props> = (props) => {
  const [trySubmit, setTrySubmit] = useState<boolean>(false)
  const [submittable, setSubmittable] = useState<boolean>(false)
  const handleClickSave = useCallback(() => setTrySubmit(true), [setTrySubmit])

  return (
    <Dialog open={props.open}>
      <DialogContent>
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
