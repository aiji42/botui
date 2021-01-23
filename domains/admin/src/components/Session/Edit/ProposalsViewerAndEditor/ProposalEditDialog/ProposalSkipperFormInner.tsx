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
  { id: 'eq', name: '(数値) =' },
  { id: 'gt', name: '(数値) >' },
  { id: 'gteq', name: '(数値) >=' },
  { id: 'lt', name: '(数値) <' },
  { id: 'lteq', name: '(数値) <=' },
  { id: 'start', name: '(文字列) 前方一致' },
  { id: 'end', name: '(文字列) 後方一致' },
  { id: 'cont', name: '(文字列) 部分一致' },
  { id: 'match', name: '(文字列) 完全一致' },
  { id: 'regex', name: '(文字列) 正規表現' },
  { id: 'include', name: '(配列) 内包' },
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
        source="data.skipNumber"
        validate={[required(), minValue(1)]}
        label="スキップ数"
      />
      <SelectInput
        source="data.logic"
        choices={logicChoices}
        validate={[required()]}
        label="各種条件の評価"
      />
      <ArrayInput source="data.conditions" label="条件" validate={[required()]}>
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
                {['start', 'end', 'cont', 'match', 'regex', 'include'].includes(
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
