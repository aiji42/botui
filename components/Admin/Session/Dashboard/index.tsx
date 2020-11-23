import { FC } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Paper, makeStyles, Box } from '@material-ui/core'
import {
  SimpleFormProps,
  FormWithRedirect,
  FormDataConsumer,
  SaveButton,
  DeleteButton
} from 'react-admin'
import SessionFormInner from '../Edit/SessionFormInner'
import ProposalViewerAndEditor from '../Edit/ProposalsViewerAndEditor'

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

  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={4}>
            <ProposalViewerAndEditor />
          </Grid>
          <Grid item xs={8}>
            <Paper style={{ minHeight: 500 }}>
              <SessionFormInner />
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
