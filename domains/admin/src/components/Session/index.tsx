import { FC } from 'react'
import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  CreateProps,
  Edit,
  Create,
  FunctionField,
  EditButton,
  Toolbar,
  SaveButton,
  DeleteButton,
  ToolbarProps
} from 'react-admin'
import EditForm from './Edit'
import CreateForm from './Create'
import EmbeddedScriptDialog from './EmbeddedScriptDialog'
import { Session } from '@botui/types'
import PreviewDialog from './PreviewDialog'
import { useFormState } from 'react-final-form'
import Empty from './Empty'

const EditToolbar: FC<Omit<ToolbarProps, 'width'>> = (props) => {
  const { values: session } = useFormState<Session>()
  return (
    <Toolbar {...props}>
      <SaveButton disabled={props.pristine} style={{ marginRight: 8 }} />
      <PreviewDialog session={session} />
      <EmbeddedScriptDialog session={session} />
    </Toolbar>
  )
}

export const SessionList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false} exporter={false} empty={<Empty />}>
      <Datagrid>
        <TextField label="タイトル" source="title" sortable={false} />
        <BooleanField label="アクティブ" source="active" />
        <FunctionField<Session>
          render={(record) =>
            record ? <PreviewDialog session={record} /> : <></>
          }
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <CreateForm warnWhenUnsavedChanges />
    </Create>
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
      <EditForm warnWhenUnsavedChanges toolbar={<EditToolbar />} />
    </Edit>
  )
}
