import { FC, useCallback, useEffect, useReducer, useState } from 'react'
import { Proposal, Session } from '../../../../../@types/session'
import { useForm, useFormState, Field } from 'react-final-form'
import ProposalsTimeLine from './ProposalsTimeLine'
import ProposalEditDialog from './ProposalEditDialog'
import reducer, { ActionType, EditingProposalAction } from './reducer'
import { v4 as uuidv4 } from 'uuid'

const initialProposal = (type: Proposal['type']): Proposal => {
  if (type === 'message')
    return {
      id: uuidv4(),
      type: 'message',
      human: false,
      content: {
        type: 'string',
        props: {
          children: ''
        }
      },
      before: '',
      after: '',
      completed: false,
      updated: false
    }
  return {
    id: uuidv4(),
    type: 'skipper',
    conditions: [{ key: '', operator: 'eq', pattern: '', negative: false }],
    skipNumber: 1,
    logic: 'and',
    before: '',
    after: '',
    completed: false,
    updated: false
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
  const [insertingProposalType, setInsertingProposalType] = useState<
    Proposal['type']
  >('message')
  const [editProposalDialogOpen, setEditProposalDialogOpen] = useState<boolean>(
    false
  )
  const handleDelete = useCallback(
    (index: number) => {
      dispatch({
        type: ActionType.ACTION_DELETE,
        index,
        newProposal: initialProposal()
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
    (index: number, proposalType: Proposal['type']) => {
      setNextAction({ type: ActionType.ACTION_INSERT, index })
      setInsertingProposalType(proposalType)
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
        editing={
          editProposalDialogOpen && nextAction.type === ActionType.ACTION_EDIT
        }
        inserting={
          editProposalDialogOpen && nextAction.type === ActionType.ACTION_INSERT
        }
        editingIndex={nextAction.index}
        proposals={proposals}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleInsert={handleInsert}
      />
      <Field name="proposals">{() => null}</Field>
      <ProposalEditDialog
        proposal={
          nextAction.type === ActionType.ACTION_EDIT
            ? proposals[nextAction.index]
            : initialProposal(insertingProposalType)
        }
        handleClose={() => setEditProposalDialogOpen(false)}
        handleSave={handleProposalSave}
        open={editProposalDialogOpen}
      />
    </>
  )
}

export default ProposalViewerAndEditor
