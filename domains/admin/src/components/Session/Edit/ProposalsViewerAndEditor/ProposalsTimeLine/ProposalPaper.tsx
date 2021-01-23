import { FC } from 'react'
import { Typography, Paper, makeStyles } from '@material-ui/core'
import { ProposalMessage } from '@botui/types'
import nl2br from 'react-nl2br'
import { useImageUrl } from '@botui/chat-hooks'

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
          <Image imageKey={proposalData.content.props.imgKey} />
        )}
      </Typography>
    </Paper>
  )
}

interface ImageProps {
  imageKey: string
}

const Image: FC<ImageProps> = (props) => {
  const src = useImageUrl(props.imageKey)
  return <img src={src} alt="illustration" width="100%" height="auto" />
}

export default ProposalPaper
