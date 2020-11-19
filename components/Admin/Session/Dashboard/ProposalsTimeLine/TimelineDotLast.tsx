import { FC } from 'react'
import { makeStyles, Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}))

interface Props {
  selected?: boolean
  handleInsertBefore: () => void
}

const TimelineDotLast: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <Fab onClick={props.handleInsertBefore} color="secondary" classes={classes}>
      <AddIcon />
    </Fab>
  )
}

export default TimelineDotLast
