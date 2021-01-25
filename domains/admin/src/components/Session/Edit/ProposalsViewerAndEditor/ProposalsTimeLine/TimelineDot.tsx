import { FC, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { TimelineDot as TimelineDotOriginal } from '@material-ui/lab'
import {
  Textsms as TextSmsIcon,
  RateReview as RateReviewIcon,
  InsertPhoto as InsertPhotoIcon,
  Edit as EditIcon,
  CallSplit as SplitIcon,
  SettingsEthernet,
  Flag as FlagIcon
} from '@material-ui/icons'
import { Proposal } from '@botui/types'

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
    if (proposal.type === 'relayer') return SettingsEthernet
    if (proposal.type === 'closer') return FlagIcon
    return SplitIcon
  }, [editing, proposal])

  return (
    <TimelineDotOriginal className={editing ? classes.editing : classes.root}>
      <Icon fontSize="large" />
    </TimelineDotOriginal>
  )
}

export default TimelineDot
