import { FC, useCallback } from 'react'
import { makeStyles, Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Proposal } from '../../../../../../@types/session'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}))

interface Props {
  selected?: boolean
  handleInsertBefore: (type: Proposal['type']) => void
}

const TimelineDotLast: FC<Props> = (props) => {
  const classes = useStyles()
  const handleClick = useCallback(() => props.handleInsertBefore('message'), [
    props.handleInsertBefore
  ])

  return (
    <Fab onClick={handleClick} color="secondary" classes={classes}>
      <AddIcon />
    </Fab>
  )
}

export default TimelineDotLast
