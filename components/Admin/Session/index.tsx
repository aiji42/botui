import { FC, useCallback } from 'react'
import {
  Create,
  Datagrid,
  EditView,
  useEditController,
  EditButton,
  List,
  ShowButton,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  EditProps
} from 'react-admin'
import {
  EditingProposalData,
  EditingSessionData,
  Proposals,
  Session
} from '../../../@types/session'
import Dashboard from './Dashboard'

const isEditingProposalData = (arg: any): arg is EditingProposalData =>
  arg.proposalIndex !== undefined

export const SessionList: FC = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="title" sortable={false} />
        <BooleanField source="active" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC = (props) => {
  const transform = (data: any) => ({
    ...data,
    proposals: JSON.stringify(data.proposals)
  })

  return (
    <Create {...props} transform={transform}>
      <Dashboard />
    </Create>
  )
}

const Edit: FC<EditProps> = (props) => {
  const { record: originalRecord, ...editController } = useEditController<
    Session<string>
  >(props)
  const record = {
    ...originalRecord,
    proposals: originalRecord?.proposals
      ? JSON.parse(originalRecord.proposals)
      : []
  } as Session
  const transform = useCallback(
    (data: EditingProposalData | EditingSessionData) => {
      if (isEditingProposalData(data)) {
        const { proposalIndex, ...restData } = data
        const newProposals = record.proposals.reduce<Proposals>(
          (res, proposal, index) =>
            index === proposalIndex ? [...res, restData] : [...res, proposal],
          []
        )
        if (record.proposals.length === proposalIndex)
          newProposals.push(restData)

        return {
          ...record,
          proposals: JSON.stringify(newProposals)
        }
      }

      return {
        ...data,
        proposals: JSON.stringify(data.proposals)
      }
    },
    [record]
  )
  editController.setTransform(transform)

  return <EditView {...props} {...editController} record={record} />
}

export const SeesionEdit: FC = (props) => {
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
