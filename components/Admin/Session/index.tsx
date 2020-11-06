import { FC, useCallback, useReducer } from 'react'
import {
  Datagrid,
  EditView,
  useEditController,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  EditProps,
  CreateProps,
  useCreateController
} from 'react-admin'
import {
  EditingProposalData,
  EditingSessionData,
  Proposals,
  Session
} from '../../../@types/session'
import Dashboard from './Dashboard'
import CreateWizard from './CreateWizard'
import { EditReducer, editReducer } from './reducer'

const isEditingProposalData = (arg: any): arg is EditingProposalData =>
  arg.proposalIndex !== undefined

export const SessionList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField source="title" sortable={false} />
        <BooleanField source="active" />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC<CreateProps> = (props) => {
  const { record, ...createController } = useCreateController(props)
  createController.setTransform((data) => {
    return {
      ...data,
      images: '{}',
      active: false
    }
  })
  return <CreateWizard {...createController} />
}

const Edit: FC<EditProps> = (props) => {
  const { record, ...editController } = useEditController<Session>(props)
  // const [state, dispatch] = useReducer<EditReducer, Session | undefined>(editReducer, record, () => {})
  const transform = useCallback(
    async (data: EditingProposalData | EditingSessionData) => {
      if (!record) return data
      if (isEditingProposalData(data)) {
        const { proposalIndex, ...restData } = data
        const newProposals = record.proposals.reduce<Proposals>(
          (res, proposal, index) =>
            index === proposalIndex ? [...res, restData] : [...res, proposal],
          []
        )
        if (record.proposals.length === proposalIndex)
          newProposals.push(restData)

        return { ...record, proposals: newProposals }
      }

      return data
    },
    [record]
  )
  editController.setTransform(transform)

  return <EditView {...props} {...editController} record={record} />
}

export const SessionEdit: FC = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()

  return (
    <Edit
      {...props}
      undoable={false}
      onSuccess={() => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, false)
        refresh()
      }}
    >
      <Dashboard />
    </Edit>
  )
}
