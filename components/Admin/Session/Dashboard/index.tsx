import { FC, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, Fab, makeStyles, Modal } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { SimpleFormProps, Record, RedirectionSideEffect } from 'react-admin'
import {
  EditingSessionData,
  EditingProposalData,
  Session
} from '../../../../@types/session'
import ProposalsTimeLine from './ProposalsTimeLine'
import SessionCard from './SessionCard'
import { EditProposalForm, EditSessionForm } from './Form'
import { UpdateSessionData, InsertProposalData } from '../modules'

type DashboardProps = Omit<SimpleFormProps, 'children'>

const Preview = dynamic(() => import('../../../Chat/Preview'), { ssr: false })

const isEditingProposalData = (arg: any): arg is EditingProposalData =>
  arg.proposalIndex !== undefined

const isEditingSessionData = (arg: any): arg is EditingSessionData =>
  arg.proposalIndex === undefined

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
  const [editingData, setEditingData] = useState<UpdateSessionData | undefined>(
    props.record
  )
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
      if (!props.record || prevEditingData?.proposalIndex === undefined)
        return props.record
      return {
        ...props.record.proposals[prevEditingData.proposalIndex],
        proposalIndex: prevEditingData?.proposalIndex
      }
    })
  }, [props.record])
  const handleDelete = useCallback(
    (index: number) => {
      save(
        {
          type: 'proposalDelete',
          targetIndex: index
        },
        {} as RedirectionSideEffect
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
          type: 'proposalEdit'
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
              onClickEdit={() => setEditingData(props.record)}
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
            {editingData && isEditingSessionData(editingData) && (
              <EditSessionForm {...props} save={save} record={editingData} />
            )}
            {editingData && isEditingProposalData(editingData) && (
              <EditProposalForm {...props} save={save} record={editingData} />
            )}
          </>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard
