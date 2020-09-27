import { FC } from 'react'
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
  TextInput,
  BooleanField,
  BooleanInput,
  TabbedShowLayout,
  ShowView,
  Tab,
  TabbedForm,
  FormTab
} from 'react-admin'
import JsonViewer from '../JsonViewer'
import ProposalEditor from './ProposalEditor'
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
const transform = (data: any) => ({
  ...data,
  proposals: JSON.stringify(data.proposals)
})

export const SessionCreate: FC = (props) => {
  return (
    <Create {...props} transform={transform}>
      {/* <TabbedForm>
        <FormTab label="main">
          <TextInput source="title" validate={validateName} />
          <BooleanInput source="active" initialValue={false} />
        </FormTab>
        <FormTab label="proposals">
          <ProposalEditor />
        </FormTab>
      </TabbedForm> */}
      <Dashboard />
    </Create>
  )
}

const Edit: FC<any> = (props) => {
  const { record, ...editController } = useEditController(props)
  const newRecord = { ...record, proposals: JSON.parse(record.proposals) }
  return <EditView {...props} {...editController} record={newRecord} />
}

export const SeesionEdit: FC = (props) => {
  return (
    <Edit {...props} transform={transform}>
      {/* <TabbedForm>
        <FormTab label="main">
          <TextInput source="accountId" validate={validateName} disabled />
          <TextInput source="title" validate={validateName} />
          <BooleanInput source="active" />
        </FormTab>
        <FormTab label="proposals">
          <ProposalEditor />
        </FormTab>
      </TabbedForm> */}
      <Dashboard />
    </Edit>
  )
}
