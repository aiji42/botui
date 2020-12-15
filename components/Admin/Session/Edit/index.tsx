import { FC } from 'react'
import { SimpleFormProps, FormTab, TabbedForm } from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ProposalViewerAndEditor from './ProposalsViewerAndEditor'

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
    </TabbedForm>
  )
}

export default Edit
