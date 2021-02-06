import React, { FC, FormEvent, ReactNode } from 'react'
import {
  Avatar,
  Button,
  Typography,
  Box,
  CircularProgress,
  makeStyles
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submitWrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

interface Props {
  footerContent: ReactNode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  title: string
  error: string
  loading: boolean
  buttonTitle: string
}

export const FormWrapper: FC<Props> = ({ footerContent, handleSubmit, title, error, loading, buttonTitle, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        {children}
        <div className={classes.submitWrapper}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {buttonTitle}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              className={classes.submitProgress}
              color="primary"
            />
          )}
        </div>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        </Box>
      </form>
      {footerContent}
    </div>
  )
}
