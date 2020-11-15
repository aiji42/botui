import { FC, ReactElement } from 'react'
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
import { Session } from '../../../@types/session'
import Dashboard from './Dashboard'
import CreateWizard from './CreateWizard'
import { sessionDataTransform, UpdateSessionData } from './modules'

export const SessionList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false} exporter={false}>
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

const Edit: FC<EditProps & { children: ReactElement }> = (props) => {
  const { record, ...editController } = useEditController<Session>(props)
  editController.setTransform((data: UpdateSessionData) =>
    sessionDataTransform(record, data)
  )

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
