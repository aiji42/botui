import { FC, useCallback } from 'react'
import {
  Create,
  Datagrid,
  EditView,
  useEditController,
  useShowController,
  EditButton,
  List,
  required,
  ShowButton,
  TextField,
  BooleanField,
  useNotify,
  useRefresh
} from 'react-admin'
import Dashboard from './Dashboard'

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

const Show = (props: any) => {
  const { record, ...showController } = useShowController(props)
  const newRecord = { ...record, proposals: JSON.parse(record.proposals) }
  return <ShowView {...props} {...showController} record={newRecord} />
}

export const SessionShow: FC = (props) => {
  return (
    <Show {...props}>
      {/* <TabbedShowLayout>
        <Tab label="main">
          <TextField source="title" />
          <BooleanField source="active" />
        </Tab>
        <Tab label="proposals" path="proposals">
          <JsonViewer source="proposals" />
        </Tab>
      </TabbedShowLayout> */}
      <Dashboard />
    </Show>
  )
}

const validateName = [required()]

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

const Edit: FC<any> = (props) => {
  const { record: originalRecord, ...editController } = useEditController(props)
  const record = {
    ...originalRecord,
    proposals: JSON.parse(originalRecord.proposals)
  }
  const transform = useCallback(
    (data: any) => {
      if (data.proposalIndex !== undefined) {
        const { proposalIndex, ...restData } = data
        const newProposals = record.proposals.reduce(
          (res: any[], proposal: any, index: number) =>
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
