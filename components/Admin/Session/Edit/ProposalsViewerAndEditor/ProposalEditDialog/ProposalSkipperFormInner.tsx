import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator,
  useRecordContext,
  NumberInput
} from 'react-admin'

const operatorChoices = [
  { id: 'eq', name: '=' },
  { id: 'gt', name: '>' },
  { id: 'gteq', name: '>=' },
  { id: 'lt', name: '<' },
  { id: 'lteq', name: '<=' },
  { id: 'start', name: '前方一致' },
  { id: 'end', name: '後方一致' },
  { id: 'cont', name: '部分一致' },
  { id: 'match', name: '完全一致' },
  { id: 'regex', name: '正規表現' },
  { id: 'true', name: 'TRUE' },
  { id: 'false', name: 'FALSE' },
  { id: 'null', name: 'NULL' }
]

const logicChoices = [
  { id: 'and', name: 'AND' },
  { id: 'or', name: 'OR' }
]

const ProposalSkipperFormInner: FC = () => {
  return (
    <>
      <NumberInput source="skipNumber" />
      <SelectInput source="logic" choices={logicChoices} />
      <ArrayInput source="conditions">
        <SimpleFormIterator>
          <TextInput source="key" />
          <SelectInput source="operator" choices={operatorChoices} />
          <TextInput source="pattern" />
          <BooleanInput source="negative" />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

export default ProposalSkipperFormInner
