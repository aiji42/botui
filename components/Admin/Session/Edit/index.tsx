import { FC } from 'react'
import { SimpleFormProps, FormTab, TabbedForm } from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ProposalViewerAndEditor from './ProposalsViewerAndEditor'
import ProposalsFlowChart from './ProposalsFlowChart'

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
      <FormTab label="フロー">
        <ProposalsFlowChart />
      </FormTab>
    </TabbedForm>
  )
}

export default Edit
