import { FC, CSSProperties } from 'react'
import { Typography, Paper, makeStyles } from '@material-ui/core'
import { ProposalMessage } from '@botui/types'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import nl2br from 'react-nl2br'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: theme.spacing(25),
    wordWrap: 'break-word',
    position: 'relative'
  },
  paperRight: {
    margin: '0 0 0 auto',
    padding: theme.spacing(2),
    maxWidth: theme.spacing(25),
    wordWrap: 'break-word',
    position: 'relative'
  }
}))

interface Props {
  proposalData: ProposalMessage['data']
  align: 'left' | 'right'
}

const ProposalPaper: FC<Props> = (props) => {
  const { proposalData, align } = props
  const classes = useStyles()
  return (
    <Paper
      elevation={1}
      className={align === 'right' ? classes.paperRight : classes.paper}
    >
      <Typography align="left">
        {proposalData.content.type === 'string' &&
          (typeof proposalData.content.props.children === 'string'
            ? nl2br(proposalData.content.props.children)
            : proposalData.content.props.children)}
        {proposalData.content.type === 'form' &&
          proposalData.content.props.type}
        {proposalData.content.type === 'image' && (
          <AmplifyS3Image
            {...proposalData.content.props}
            style={({ '--width': '100%' } as unknown) as CSSProperties}
          />
        )}
      </Typography>
    </Paper>
  )
}

export default ProposalPaper
