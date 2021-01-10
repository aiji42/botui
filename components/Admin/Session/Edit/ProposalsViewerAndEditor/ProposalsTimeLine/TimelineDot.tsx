import { FC, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { TimelineDot as TimelineDotOriginal } from '@material-ui/lab'
import {
  Textsms as TextSmsIcon,
  RateReview as RateReviewIcon,
  InsertPhoto as InsertPhotoIcon,
  Edit as EditIcon,
  CallSplit as CallSplitIcon,
  CodeSharp as CodeSharpIcon,
  HttpSharp as HttpSharpIcon,
  SaveSharp as SaveSharpIcon,
  CancelSharp as CancelSharpIcon
} from '@material-ui/icons'
import { Proposal } from '../../../../../../@types/session'

const SplitIcon: FC = (props) => (
  <CallSplitIcon {...props} style={{ transform: 'rotate(180deg)' }} />
)

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  editing: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.warning.main
  }
}))

interface Props {
  proposal?: Proposal
  editing?: boolean
}

const TimelineDot: FC<Props> = (props) => {
  const { proposal, editing } = props
  const classes = useStyles()
  const Icon = useMemo(() => {
    if (editing || !proposal) return EditIcon
    if (proposal.type === 'message') {
      return proposal.data.content.type === 'string'
        ? TextSmsIcon
        : proposal.data.content.type === 'form'
        ? RateReviewIcon
        : InsertPhotoIcon
    }
    if (proposal.type === 'relayer' || proposal.type === 'closer') {
      return proposal.data.job === 'script'
        ? CodeSharpIcon
        : proposal.data.job === 'webhook'
        ? HttpSharpIcon
        : proposal.data.job === 'store'
        ? SaveSharpIcon
        : CancelSharpIcon
    }
    return SplitIcon
  }, [editing, proposal])

  return (
    <TimelineDotOriginal className={editing ? classes.editing : classes.root}>
      <Icon fontSize="large" />
    </TimelineDotOriginal>
  )
}

export default TimelineDot
