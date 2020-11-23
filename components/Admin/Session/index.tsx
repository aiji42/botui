import { FC } from 'react'
import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  CreateProps,
  useCreateController,
  CreateContextProvider,
  Edit
} from 'react-admin'
import EditForm from './Edit'
import CreateWizard from './CreateWizard'

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
  return (
    <CreateContextProvider value={{ record, ...createController }}>
      <CreateWizard {...createController} warnWhenUnsavedChanges />
    </CreateContextProvider>
  )
}

export const SessionEdit: FC = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()

  return (
    <Edit
      {...props}
      onSuccess={() => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, true)
        refresh()
      }}
    >
      <EditForm />
    </Edit>
  )
}
