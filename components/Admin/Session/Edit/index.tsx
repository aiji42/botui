import { FC } from 'react'
import {
  Grid,
  Box,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Paper
} from '@material-ui/core'
import {
  SimpleFormProps,
  FormWithRedirect,
  SaveButton,
  DeleteButton
} from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ProposalViewerAndEditor from './ProposalsViewerAndEditor'
import PreviewDialog from './PreviewDialog'

const useStyles = makeStyles((theme) => ({
  side: {
    maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    overflow: 'scroll'
  },
  sideAppBer: {
    maxHeight: theme.spacing(8)
  }
}))

type Props = Omit<SimpleFormProps, 'children'>

const Edit: FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Grid container>
          <Grid item container xs={5} className={classes.side}>
            <AppBar position="sticky" className={classes.sideAppBer}>
              <Toolbar>
                <Box marginRight={2}>
                  <PreviewDialog />
                </Box>
                <Typography variant="h6" color="inherit">
                  タイムライン
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid item xs={12}>
              <Box p={2}>
                <ProposalViewerAndEditor />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={7} component={Paper}>
            <Box p={2}>
              <SessionFormInner />
              <Box display="flex" justifyContent="space-between">
                <SaveButton
                  saving={formProps.saving}
                  disabled={formProps.pristine}
                  invalid={formProps.invalid}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
                <DeleteButton record={formProps.record} resource="sessions" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    />
  )
}

export default Edit
