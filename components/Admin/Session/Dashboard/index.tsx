import { FC, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, makeStyles, Modal, Box } from '@material-ui/core'
import {
  SimpleFormProps,
  FormWithRedirect,
  TextInput,
  BooleanInput,
  FormDataConsumer,
  RadioButtonGroupInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  required,
  Labeled
} from 'react-admin'
import { Proposal, Proposals, Session } from '../../../../@types/session'
import ProposalsTimeLine from './ProposalsTimeLine'
import SessionCard from './SessionCard'
import { EditProposalForm, EditSessionForm } from './Form'
import {
  UpdateSessionData,
  InsertProposalData,
  EditSessionData
} from '../modules'
import EditProposalDialog from './Form/EditProposalDialog'
import isColor from 'is-color'
import { ColorInput, ImageInput } from '../parts'
import SimplePreview from './Form/EditSessionForm/SimplePreview'
import { useForm } from 'react-final-form'

const colorValidator = (color: string) => {
  return isColor(color) ? null : '入力内容が間違っています'
}

type DashboardProps = Omit<SimpleFormProps, 'children'>

const Preview = dynamic(() => import('../../../Chat/Preview'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  proposalList: {
    maxHeight: 600,
    overflow: 'auto',
    padding: theme.spacing(0)
  },
  addProposalButton: {
    position: 'sticky',
    bottom: 5,
    left: '100%'
  },
  preview: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    height: 700,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

const initialProposal: Proposal = {
  human: false,
  content: {
    type: 'string',
    props: {
      children: ''
    }
  },
  before: '',
  after: ''
} as Proposal

const ProposalEdit: FC<{ proposals: Proposals }> = (props) => {
  const [editingProposal, setEditingProposal] = useState<Proposal>(
    initialProposal
  )
  const [editingIndex, setEditingIndex] = useState<number>(0)
  const [editingType, setEditingType] = useState<string>('')
  const [editProposalDialogOpen, setEditProposalDialogOpen] = useState<boolean>(
    false
  )
  const { change } = useForm()
  const handleProposalSave = useCallback(
    (newProposal: Proposal) => {
      // type と index 同時に変更できないと、正しく動かない
      if (editingType === 'edit')
        change(
          'proposals',
          props.proposals.map((proposal, index) =>
            index === editingIndex ? newProposal : proposal
          )
        )
      if (editingType === 'insertBefore')
        change('proposals', [
          ...props.proposals.slice(0, editingIndex),
          newProposal,
          ...props.proposals.slice(editingIndex)
        ])
      if (editingType === 'insertAfter')
        change('proposals', [
          ...props.proposals.slice(0, editingIndex + 1),
          newProposal,
          ...props.proposals.slice(editingIndex + 1)
        ])
      if (editingType === 'delete')
        change(
          'proposals',
          props.proposals.filter((_, index) => index !== editingIndex)
        )
      setEditProposalDialogOpen(false)
    },
    [editingIndex, editingType, props.proposals, setEditProposalDialogOpen]
  )
  const handleDelete = useCallback(
    (index: number) => {
      setEditingIndex(index)
      setEditingType('delete')
      handleProposalSave(initialProposal)
    },
    [setEditingIndex, setEditingType, handleProposalSave]
  )
  const handleEdit = useCallback(
    (index: number) => {
      setEditingIndex(index)
      setEditingType('edit')
      setEditingProposal(props.proposals[index])
      setEditProposalDialogOpen(true)
    },
    [
      setEditingIndex,
      setEditingProposal,
      setEditingProposal,
      setEditProposalDialogOpen,
      props.proposals
    ]
  )
  const handleInsertBefore = useCallback(
    (index: number) => {
      setEditingIndex(index)
      setEditingType('insertBefore')
      setEditingProposal(initialProposal)
      setEditProposalDialogOpen(true)
    },
    [
      setEditingIndex,
      setEditingProposal,
      setEditingProposal,
      setEditProposalDialogOpen
    ]
  )
  const handleInsertAfter = useCallback(
    (index: number) => {
      setEditingIndex(index)
      setEditingType('insertAfter')
      setEditingProposal(initialProposal)
      setEditProposalDialogOpen(true)
    },
    [
      setEditingIndex,
      setEditingProposal,
      setEditingProposal,
      setEditProposalDialogOpen
    ]
  )

  return (
    <>
      <ProposalsTimeLine
        editing={false}
        inserting={false}
        proposals={props.proposals}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleInsertBefore={handleInsertBefore}
        handleInsertAfter={handleInsertAfter}
      />
      <EditProposalDialog
        proposal={editingProposal}
        handleClose={() => setEditProposalDialogOpen(false)}
        handleSave={handleProposalSave}
        open={editProposalDialogOpen}
      />
    </>
  )
}

const Dashboard: FC<DashboardProps> = (props) => {
  const classes = useStyles()

  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={4}>
            <FormDataConsumer>
              {({ formData }) => (
                <ProposalEdit proposals={formData.proposals} />
              )}
            </FormDataConsumer>
          </Grid>
          <Grid item xs={8}>
            <Paper style={{ minHeight: 500 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box p={2}>
                    <TextInput source="title" resource="sessions" />
                    <BooleanInput source="active" resource="sessions" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p={2}>
                    <ColorInput
                      source="theme.header.backgroundColor"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="ヘッダー"
                    />
                    <ColorInput
                      source="theme.agent.backgroundColor"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="オペレーターメッセージバルーン"
                    />
                    <ColorInput
                      source="theme.agent.color"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="オペレーターメッセージ"
                    />
                    <ColorInput
                      source="theme.user.backgroundColor"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="ユーザメッセージバルーン"
                    />
                    <ColorInput
                      source="theme.user.color"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="ユーザーメッセージ"
                    />
                    <ColorInput
                      source="theme.footer.backgroundColor"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="フッター"
                    />
                    <ColorInput
                      source="theme.progressBar.backgroundColor"
                      resource="sessions"
                      validate={[required(), colorValidator]}
                      label="プログレスバー"
                    />

                    <FormDataConsumer>
                      {({ formData }) => (
                        <ImageInput
                          source="images.logo.key"
                          resource="sessions"
                          label="ヘッダーロゴ"
                          sessionId={formData.id}
                        />
                      )}
                    </FormDataConsumer>
                    <RadioButtonGroupInput
                      source="images.agent"
                      resource="sessions"
                      initialValue="/operator_female1.jpg"
                      label="オペレーターアイコン"
                      row
                      fullWidth
                      choices={[
                        { id: '/operator_female1.jpg', name: '女性1' },
                        { id: '/operator_female2.jpg', name: '女性2' },
                        { id: '/operator_female3.jpg', name: '女性3' },
                        { id: '/operator_male1.jpg', name: '男性1' },
                        { id: '/operator_bot1.jpg', name: 'ボット' }
                      ]}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <FormDataConsumer>
                    {({ formData }) => (
                      <Labeled label="プレビュー">
                        <SimplePreview {...formData} />
                      </Labeled>
                    )}
                  </FormDataConsumer>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="space-between" width="100%">
                <SaveButton
                  saving={formProps.saving}
                  disabled={formProps.pristine}
                  invalid={formProps.invalid}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
                <DeleteButton
                  record={formProps.record}
                  resource="sessions"
                  undoable={false}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    />
  )
}

export default Dashboard
