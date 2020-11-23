import { FC } from 'react'
import { Grid, Box } from '@material-ui/core'
import {
  SimpleFormProps,
  FormWithRedirect,
  SaveButton,
  DeleteButton
} from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ProposalViewerAndEditor from './ProposalsViewerAndEditor'
import PreviewDialog from './PreviewDialog'

type Props = Omit<SimpleFormProps, 'children'>

const Edit: FC<Props> = (props) => {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box p={2}>
              <ProposalViewerAndEditor />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box p={2}>
              <SessionFormInner />
              <Box display="flex" justifyContent="space-between">
                <SaveButton
                  saving={formProps.saving}
                  disabled={formProps.pristine}
                  invalid={formProps.invalid}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
                <PreviewDialog />
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
