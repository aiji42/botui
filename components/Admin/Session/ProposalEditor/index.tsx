import { FC } from 'react'
import {
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  BooleanInput,
  NumberInput,
  TextInput,
  FormDataConsumer
} from 'react-admin'

const ProposalEditor: FC = (props) => {
  return (
    <ArrayInput source="proposals">
      <SimpleFormIterator>
        <BooleanInput source="human" />
        <SelectInput
          source="content.type"
          choices={[
            { id: 'string', name: 'テキスト' },
            { id: 'form', name: 'フォーム' }
          ]}
        />
        <NumberInput source="content.delay" initialValue={500} />
        <FormDataConsumer>
          {({ scopedFormData, getSource }: any) =>
            scopedFormData.content?.type === 'string' ? (
              <StringTypeEditor source={getSource('props.children')} />
            ) : (
              <FormTypeEditor />
            )
          }
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const StringTypeEditor: FC<{ source: string }> = (props) => {
  return <TextInput {...props} />
}

const FormTypeEditor: FC = (props) => {
  return <></>
}

export default ProposalEditor
