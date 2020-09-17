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
        <BooleanInput source="human" label="ユーザ側" />
        <SelectInput
          source="content.type"
          label="メッセージタイプ"
          choices={[
            { id: 'string', name: 'テキスト' },
            { id: 'form', name: 'フォーム' }
          ]}
        />
        <NumberInput
          source="content.delay"
          initialValue={500}
          label="ローディング時間(ms)"
        />
        <FormDataConsumer>
          {({ scopedFormData, getSource }: any) =>
            scopedFormData.content?.type === 'string' ? (
              <StringTypeEditor
                source={getSource('props.children')}
                label="メッセージ本文"
              />
            ) : (
              <FormTypeEditor />
            )
          }
        </FormDataConsumer>
        <TextInput source="before" label="before function" />
        <TextInput source="after" label="after function" />
      </SimpleFormIterator>
    </ArrayInput>
  )
}

const StringTypeEditor: FC<{ source: string; label: string }> = (props) => {
  return <TextInput {...props} />
}

const FormTypeEditor: FC = (props) => {
  return <></>
}

export default ProposalEditor
