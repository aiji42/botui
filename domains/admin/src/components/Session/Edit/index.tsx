import { FC } from 'react'
import { SimpleFormProps, FormTab, TabbedForm } from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ProposalViewerAndEditor from './ProposalsViewerAndEditor'
import ChatLauncherFormInner from './ChatLauncherFormInner'

type Props = Omit<SimpleFormProps, 'children'>

const Edit: FC<Props> = (props) => {
  return (
    <TabbedForm {...props}>
      <FormTab label="概要">
        <SessionFormInner />
      </FormTab>
      <FormTab label="タイムライン">
        <ProposalViewerAndEditor />
      </FormTab>
      <FormTab label="ランチャー">
        <ChatLauncherFormInner />
      </FormTab>
    </TabbedForm>
  )
}

export default Edit
