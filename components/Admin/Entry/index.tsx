import { FC } from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  FunctionField,
  FilterProps,
  TextInput
} from 'react-admin'
import { AmplifyFilter } from 'react-admin-amplify'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { Entry } from '../../../@types/entry'

export const EntryShow: FC = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="sessionId" reference="sessions">
        <TextField source="title" />
      </ReferenceField>
      <FunctionField<Entry>
        label="inputs"
        fullWidth
        render={(record) => {
          if (!record) return <></>

          return (
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries<
                    Record<
                      string,
                      | string
                      | number
                      | boolean
                      | Array<string | number | boolean>
                    >
                  >(JSON.parse(record.inputs)).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                        {['string', 'number'].includes(typeof value)
                          ? value
                          : JSON.stringify(value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        }}
      />
      <DateField source="createdAt" showTime />
    </SimpleShowLayout>
  </Show>
)

type EntryFilterProps = {
  defaultQuery: string
  setQuery?: React.Dispatch<string>
} & FilterProps

const EntryFilter: FC<Partial<EntryFilterProps>> = (props) => {
  return (
    <AmplifyFilter {...(props as EntryFilterProps)}>
      <TextInput
        source="entryBySessionAndCreatedAt.sessionId"
        label="session"
        alwaysOn
      />
    </AmplifyFilter>
  )
}

export const EntryList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false} filters={<EntryFilter />}>
      <Datagrid expand={<EntryShow />} rowClick="expand">
        <TextField source="id" sortable={false} />
        <ReferenceField source="sessionId" reference="sessions">
          <TextField source="title" />
        </ReferenceField>
        <DateField
          source="createdAt"
          sortBy="entryBySessionAndCreatedAt"
          showTime
        />
      </Datagrid>
    </List>
  )
}
