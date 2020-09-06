import { FC } from 'react'
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  required,
  Show,
  ShowButton,
  TextField,
  TextInput,
  BooleanField,
  BooleanInput,
  TabbedShowLayout,
  Tab,
  TabbedForm,
  FormTab
} from 'react-admin'
import JsonEditor from '../JsonEditor'
import JsonViewer from '../JsonViewer'

export const SessionList: FC = (props) => {
  return (
    <List {...props} >
      <Datagrid>
        <TextField source="title" sortable={false} />
        <BooleanField source="active" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  )
}

export const SessionShow: FC = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="main" >
          <TextField source="title" />
          <BooleanField source="active" />
        </Tab>
        <Tab label="proposals" path="proposals">
          <JsonViewer source="proposals" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

const validateName = [required()];

export const SessionCreate: FC = (props) => {
  return (
    <Create {...props}>
      <TabbedForm>
        <FormTab label="main">
          <TextInput source="title" validate={validateName} />
          <BooleanInput source="active" initialValue={false} />
        </FormTab>
        <FormTab label="proposals">
          <JsonEditor source="proposals" />
        </FormTab>
      </TabbedForm>
    </Create>
  )
}

export const SeesionEdit: FC = (props) => {
  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label="main">
          <TextInput source="accountId" validate={validateName} disabled />
          <TextInput source="title" validate={validateName} />
          <BooleanInput source="active" />
        </FormTab>
        <FormTab label="proposals">
          <JsonEditor source="proposals" />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}