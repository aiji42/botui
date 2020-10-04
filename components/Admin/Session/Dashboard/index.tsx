import { FC, useCallback, useState } from 'react'
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Fab,
  makeStyles
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import {
  TextField,
  BooleanField,
  SimpleShowLayout,
  SimpleFormProps,
  Record
} from 'react-admin'
import {
  EditingSessionData,
  EditingProposalData
} from '../../../../@types/session'
import ProposalsTimeLine from './ProposalsTimeLine'
import { EditProposalForm, EditSessionForm } from './Form'

type DashboardProps = Omit<SimpleFormProps, 'children'>

const isEditingProposalData = (arg: any): arg is EditingProposalData =>
  arg.proposalIndex !== undefined

const isEditingSessionData = (arg: any): arg is EditingSessionData =>
  arg.proposalIndex === undefined

const useStyles = makeStyles((theme) => ({
  proposalList: {
    maxHeight: 600,
    overflow: 'auto',
    padding: theme.spacing(0)
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
    <Grid container spacing={2} style={{ padding: 5 }}>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <SimpleShowLayout {...props}>
                  <TextField source="title" />
                  <BooleanField source="active" />
                </SimpleShowLayout>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Preview
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setEditingData(props.record)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
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
              <Fab
                color="primary"
                style={{ position: 'sticky', bottom: 5, left: '100%' }}
              >
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
