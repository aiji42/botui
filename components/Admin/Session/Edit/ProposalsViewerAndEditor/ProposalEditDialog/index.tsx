import { FC, useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import { Proposal } from '../../../../../../@types/session'
import ProposalForm from './ProposalForm'

interface Props {
  proposal: Proposal
  open: boolean
  handleClose: () => void
  handleSave: (proposal: Proposal) => void
}

const ProposalEditDialog: FC<Props> = (props) => {
  const [trySubmit, setTrySubmit] = useState<boolean>(false)
  const handleClickSave = useCallback(() => setTrySubmit(true), [setTrySubmit])

  return (
    <Dialog open={props.open}>
      <DialogContent>
        <ProposalForm
          initialValues={props.proposal}
          onSubmit={props.handleSave}
          trySubmit={trySubmit}
          handleTrySubmit={setTrySubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>cancel</Button>
        <Button onClick={handleClickSave}>save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProposalEditDialog
