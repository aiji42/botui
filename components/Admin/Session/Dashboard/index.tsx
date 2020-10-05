import { FC, useCallback, useState } from 'react'
import { Grid, Paper, Fab, makeStyles } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { SimpleFormProps, Record } from 'react-admin'
import {
  EditingSessionData,
  EditingProposalData,
  Session
} from '../../../../@types/session'
import ProposalsTimeLine from './ProposalsTimeLine'
import SessionCard from './SessionCard'
import { EditProposalForm, EditSessionForm } from './Form'

type DashboardProps = Omit<SimpleFormProps, 'children'>

const noop = (): void => {
  // do nothing.
}

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
  }
}))

const Dashboard: FC<DashboardProps> = (props) => {
  const classes = useStyles()

  const [editingData, setEditingData] = useState<Partial<Record> | undefined>(
    props.record
  )
  const save: SimpleFormProps['save'] = useCallback(
    (data, redirectTo, _a) => {
      setEditingData(data)
      if (props.save) props.save(data, redirectTo, _a)
    },
    [props.save, setEditingData]
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
              onClickPreview={noop}
            />
          </Grid>
          <Grid item xs={12} className={classes.proposalList}>
            <ProposalsTimeLine
              proposals={props.record.proposals}
              handleClick={(index) => () => {
                props.record &&
                  setEditingData({
                    ...props.record.proposals[index],
                    proposalIndex: index
                  })
              }}
            >
              <Fab color="primary" className={classes.addProposalButton}>
                <AddIcon
                  onClick={() => {
                    props.record &&
                      setEditingData({
                        id: '',
                        proposalIndex: props.record.proposals.length
                      })
                  }}
                />
              </Fab>
            </ProposalsTimeLine>
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
