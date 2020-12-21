import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  minValue,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  FormDataConsumer
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
        validate={[required(), minValue(1)]}
        label="スキップ数"
      />
      <SelectInput
        source="logic"
        choices={logicChoices}
        validate={[required()]}
        label="各種条件の評価"
      />
      <ArrayInput source="conditions" label="条件" validate={[required()]}>
        <SimpleFormIterator>
          <FormDataConsumer>
            {({ scopedFormData, getSource }) => (
              <>
                <TextInput
                  source={(getSource && getSource('key')) || ''}
                  validate={[required()]}
                  label="値名"
                  fullWidth
                />
                <SelectInput
                  source={getSource && getSource('operator')}
                  choices={operatorChoices}
                  validate={[required()]}
                  label="評価"
                  fullWidth
                />
                {['eq', 'gt', 'lt', 'gteq', 'lteq'].includes(
                  scopedFormData?.operator
                ) && (
                  <NumberInput
                    source={(getSource && getSource('pattern')) || ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                {['start', 'end', 'cont', 'match', 'regex'].includes(
                  scopedFormData?.operator
                ) && (
                  <TextInput
                    source={(getSource && getSource('pattern')) || ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                <BooleanInput
                  source={(getSource && getSource('negative')) || ''}
                  label="否定(NOT)"
                />
              </>
            )}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

export default ProposalSkipperFormInner
