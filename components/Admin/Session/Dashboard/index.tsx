import { FC, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, makeStyles, Modal } from '@material-ui/core'
import { SimpleFormProps } from 'react-admin'
import { Session } from '../../../../@types/session'
import ProposalsTimeLine from './ProposalsTimeLine'
import SessionCard from './SessionCard'
import { EditProposalForm, EditSessionForm } from './Form'
import {
  UpdateSessionData,
  InsertProposalData,
  EditSessionData
} from '../modules'

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

const Dashboard: FC<DashboardProps> = (props) => {
  const classes = useStyles()
  const [previewOpen, setPreviewOpen] = useState<boolean>(false)
  const [editingData, setEditingData] = useState<UpdateSessionData>({
    ...props.record,
    type: 'editSession'
  } as EditSessionData)
  const handlePreviewClose = useCallback(() => setPreviewOpen(false), [
    setPreviewOpen
  ])
  const save: SimpleFormProps['save'] = useCallback(
    (data, redirectTo, _a) => {
      setEditingData(data)
      if (props.save) props.save(data, redirectTo, _a)
    },
    [props.save, setEditingData]
  )
  useEffect(() => {
    setEditingData((prevEditingData) => {
      if (prevEditingData.type === 'editSession')
        return {
          ...props.record,
          type: 'editSession'
        }
      if (prevEditingData.type === 'deleteProposal')
        return {
          ...props.record,
          type: 'editSession'
        }
      if (prevEditingData.type === 'editProposal')
        return {
          ...props.record?.proposals[prevEditingData.targetIndex],
          targetIndex: prevEditingData.targetIndex,
          type: 'editProposal'
        }
      if (prevEditingData.type === 'insertProposalBefore')
        return {
          ...props.record?.proposals[prevEditingData.insertIndex],
          targetIndex: prevEditingData.insertIndex,
          type: 'editProposal'
        }
      if (prevEditingData.type === 'insertProposalAfter')
        return {
          ...props.record?.proposals[prevEditingData.insertIndex + 1],
          targetIndex: prevEditingData.insertIndex + 1,
          type: 'editProposal'
        }
    })
  }, [props.record])
  const handleSessionEdit = useCallback(() => {
    setEditingData({
      ...props.record,
      type: 'editSession'
    } as EditSessionData)
  }, [props.record])
  const handleDelete = useCallback(
    (index: number) => {
      save(
        {
          type: 'deleteProposal',
          targetIndex: index
        },
        false
      )
    },
    [save]
  )
  const handleEdit = useCallback(
    (index: number) => {
      props.record &&
        setEditingData({
          ...props.record.proposals[index],
          targetIndex: index,
          type: 'editProposal'
        })
    },
    [setEditingData, props.record]
  )
  const handleInsertBefore = useCallback(
    (index: number) => {
      setEditingData({
        insertIndex: index,
        type: 'insertProposalBefore'
      } as InsertProposalData)
    },
    [setEditingData]
  )
  const handleInsertAfter = useCallback(
    (index: number) => {
      setEditingData({
        insertIndex: index,
        type: 'insertProposalAfter'
      } as InsertProposalData)
    },
    [setEditingData]
  )

  if (props.record === undefined) return <></>

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SessionCard
              {...(props.record as Session)}
              onClickEdit={handleSessionEdit}
              onClickPreview={() => setPreviewOpen(true)}
            />
            <Modal open={previewOpen} onClose={handlePreviewClose}>
              <div className={classes.preview}>
                <Preview
                  proposals={props.record.proposals}
                  chatConfig={{
                    ...(props.record as Session),
                    messages: [],
                    messagesCount: props.record.proposals.length
                  }}
                />
              </div>
            </Modal>
          </Grid>
          <Grid item xs={12} className={classes.proposalList}>
            <ProposalsTimeLine
              editing={editingData.type === 'editProposal'}
              editingIndex={
                editingData.type === 'editProposal'
                  ? editingData.targetIndex
                  : undefined
              }
              inserting={
                editingData.type === 'insertProposalBefore' ||
                editingData.type === 'insertProposalAfter'
              }
              insertingIndex={
                editingData.type === 'insertProposalBefore'
                  ? editingData.insertIndex
                  : editingData.type === 'insertProposalAfter'
                  ? editingData.insertIndex + 1
                  : undefined
              }
              proposals={props.record.proposals}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleInsertBefore={handleInsertBefore}
              handleInsertAfter={handleInsertAfter}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ minHeight: 500 }}>
          <>
            {editingData && editingData.type === 'editSession' && (
              <EditSessionForm {...props} save={save} record={editingData} />
            )}
            {editingData && editingData.type !== 'editSession' && (
              <EditProposalForm
                {...props}
                save={save}
                record={{ id: '', ...editingData }}
              />
            )}
          </>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard
