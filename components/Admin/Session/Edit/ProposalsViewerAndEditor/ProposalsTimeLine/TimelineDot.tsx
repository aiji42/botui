import { FC, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { TimelineDot as TimelineDotOriginal } from '@material-ui/lab'
import {
  Textsms as TextSmsIcon,
  RateReview as RateReviewIcon,
  InsertPhoto as InsertPhotoIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import { Proposal } from '../../../../../../@types/session'

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

interface Props extends Partial<Proposal> {
  editing?: boolean
}

const TimelineDot: FC<Props> = (props) => {
  const classes = useStyles()
  const Icon = useMemo(() => {
    if (props.editing || !props.content) return EditIcon
    return props.content.type === 'string'
      ? TextSmsIcon
      : props.content.type === 'form'
      ? RateReviewIcon
      : InsertPhotoIcon
  }, [props.editing, props.content])

  return (
    <TimelineDotOriginal
      className={props.editing ? classes.editing : classes.root}
    >
      <Icon fontSize="large" />
    </TimelineDotOriginal>
  )
}

export default TimelineDot
