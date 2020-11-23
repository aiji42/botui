import {
  FC,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react'
import { Proposal, Proposals, Session } from '../../../../../@types/session'
import { useForm, useFormState } from 'react-final-form'
import ProposalsTimeLine from './ProposalsTimeLine'
import ProposalEditDialog from './ProposalEditDialog'

const initialProposal: Proposal = {
  human: false,
  content: {
    type: 'string',
    props: {
      children: ''
    }
  },
  before: '',
  after: ''
} as Proposal

enum ActionType {
  ACTION_EDIT = 'EDIT',
  ACTION_INSERT = 'INSERT',
  ACTION_DELETE = 'DELETE'
}

interface EditingProposalAction {
  type: ActionType
  index: number
  newProposal: Proposal
}

const reducer: Reducer<Proposals, EditingProposalAction> = (
  proposals,
  action
): Proposals => {
  switch (action.type) {
    case ActionType.ACTION_EDIT:
      return proposals.map((proposal, index) =>
        index === action.index ? action.newProposal : proposal
      )
    case ActionType.ACTION_INSERT:
      return [
        ...proposals.slice(0, action.index),
        action.newProposal,
        ...proposals.slice(action.index)
      ]
    case ActionType.ACTION_DELETE:
      return proposals.filter((_, index) => index !== action.index)
    default:
      return proposals
  }
}

const ProposalViewerAndEditor: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()
  const { change } = useForm()
  const [newProposals, dispatch] = useReducer(reducer, proposals)
  const [nextAction, setNextAction] = useState<
    Omit<EditingProposalAction, 'newProposal'>
  >({ type: ActionType.ACTION_EDIT, index: -1 })
  useEffect(() => {
    change('proposals', newProposals)
  }, [newProposals, change])
  const [editProposalDialogOpen, setEditProposalDialogOpen] = useState<boolean>(
    false
  )
  const handleDelete = useCallback(
    (index: number) => {
      dispatch({
        type: ActionType.ACTION_DELETE,
        index,
        newProposal: initialProposal
      })
    },
    [dispatch]
  )
  const handleEdit = useCallback(
    (index: number) => {
      setNextAction({ type: ActionType.ACTION_EDIT, index })
      setEditProposalDialogOpen(true)
    },
    [setNextAction, setEditProposalDialogOpen]
  )
  const handleInsert = useCallback(
    (index: number) => {
      setNextAction({ type: ActionType.ACTION_INSERT, index })
      setEditProposalDialogOpen(true)
    },
    [setNextAction, setEditProposalDialogOpen]
  )
  const handleProposalSave = useCallback(
    (newProposal: Proposal) => {
      dispatch({ ...nextAction, newProposal })
      setEditProposalDialogOpen(false)
    },
    [dispatch, nextAction, setEditProposalDialogOpen]
  )

  return (
    <>
      <ProposalsTimeLine
        editing={false}
        inserting={false}
        proposals={proposals}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleInsert={handleInsert}
      />
      <ProposalEditDialog
        proposal={
          nextAction.type === ActionType.ACTION_EDIT
            ? proposals[nextAction.index]
            : initialProposal
        }
        handleClose={() => setEditProposalDialogOpen(false)}
        handleSave={handleProposalSave}
        open={editProposalDialogOpen}
      />
    </>
  )
}

export default ProposalViewerAndEditor
