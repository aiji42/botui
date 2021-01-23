import { FC, useMemo, useEffect } from 'react'
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
  SelectInput,
  useListFilterContext
} from 'react-admin'
import { AmplifyFilter } from 'react-admin-amplify'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { Entry } from '@botui/types'
import { useSessions } from '../../hooks'

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
  const sessions = useSessions()
  const choices = useMemo(
    () => sessions.map(({ id, title: name }) => ({ id, name })),
    [sessions]
  )
  const { setFilters, displayedFilters } = useListFilterContext()
  useEffect(() => {
    choices.length > 0 &&
      setFilters(
        { entryBySessionAndCreatedAt: { sessionId: sessions[0].id } },
        displayedFilters
      )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, sessions])

  return (
    <AmplifyFilter {...(props as EntryFilterProps)}>
      <SelectInput
        choices={choices}
        source="entryBySessionAndCreatedAt.sessionId"
        label="session"
        allowEmpty={false}
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
