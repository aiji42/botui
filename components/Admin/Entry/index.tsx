import { FC } from 'react'
import { Datagrid, List, TextField, DateField } from 'react-admin'

export const EntryList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false} exporter={false}>
      <Datagrid>
        <TextField source="id" sortable={false} />
        <TextField source="sessionId" sortable={false} />
        <TextField source="inputs" sortable={false} />
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  )
}
