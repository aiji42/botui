import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
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
      <NumberInput
        source="skipNumber"
        validate={[required()]}
        label="スキップ数"
      />
      <SelectInput
        source="logic"
        choices={logicChoices}
        validate={[required()]}
        label="各種条件の評価"
      />
      <ArrayInput source="conditions" label="条件">
        <SimpleFormIterator>
          <TextInput source="key" validate={[required()]} label="値名" />
          <SelectInput
            source="operator"
            choices={operatorChoices}
            validate={[required()]}
            label="評価"
          />
          <TextInput source="pattern" label="評価値・パターン" />
          <BooleanInput source="negative" label="否定(NOT)" />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

export default ProposalSkipperFormInner
