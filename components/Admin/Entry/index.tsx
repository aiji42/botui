import { FC } from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  FunctionField
} from 'react-admin'
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

export const EntryList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false}>
      <Datagrid expand={<EntryShow />} rowClick="expand">
        <TextField source="id" sortable={false} />
        <ReferenceField source="sessionId" reference="sessions">
          <TextField source="title" />
        </ReferenceField>
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  )
}
