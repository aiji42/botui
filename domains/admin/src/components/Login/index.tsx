import React, { FC, FormEvent, useCallback, useEffect, useReducer, Reducer, useState } from 'react'
import { useCheckAuth } from 'react-admin'
import { useHistory } from 'react-router-dom'
import { Avatar, Button, TextField, Link, Paper, Grid, Typography, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Auth, I18n } from 'aws-amplify'
import vocabularies from '../../i18n/amplify/vocabularies'
I18n.putVocabularies(vocabularies)
I18n.setLanguage('ja')

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export function Login() {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignIn />
        <SignUp />
        <ConfirmSignUp email="aaaaaa" />
        <ForgotPassword />
        <ResetPassword email="aaaaaa" />
      </Grid>
    </Grid>
  )
}

const SignIn: FC = () => {
  const classes = useStyles()
  const [{ email, password }, setDataset] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.signIn(email, password)
        .then(console.log)
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, password]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setDataset((prev) => ({ ...prev, email: e.target.value }))}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setDataset((prev) => ({ ...prev, password: e.target.value }))}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Box textAlign="center" mb={2}><Typography variant="caption" color="error">{errorMessage}</Typography></Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const SignUp: FC = () => {
  const classes = useStyles()
  const [{ email, password }, setDataset] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.signUp(email, password).then(console.log).catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, password]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Box textAlign="center" mb={2}><Typography variant="caption" color="error">{errorMessage}</Typography></Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ConfirmSignUp: FC<{ email: string }> = ({ email }) => {
  // メアド・コード
  const classes = useStyles()
  const [{ code }, setDataset] = useState({
    code: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.confirmSignUp(email, code).then(console.log).catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, code]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="code"
          label="code"
          id="code"
          autoComplete="one-time-code"
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, code: e.target.value }))
          }
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Box textAlign="center" mb={2}><Typography variant="caption" color="error">{errorMessage}</Typography></Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ForgotPassword: FC = () => {
  // メアド
  const classes = useStyles()
  const [{ email }, setDataset] = useState({ email: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.forgotPassword(email).then(console.log).catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Forgot Password
        </Button>
        <Box textAlign="center" mb={2}><Typography variant="caption" color="error">{errorMessage}</Typography></Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ResetPassword: FC<{ email: string }> = ({ email }) => {
  // メアド・コード・newパスワード
  const classes = useStyles()
  const [{ code, password }, setDataset] = useState({
    code: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.forgotPasswordSubmit(email, code, password)
        .then(console.log)
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, code, password]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="code"
          label="code"
          id="code"
          autoComplete="one-time-code"
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, code: e.target.value }))
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={(e) =>
            setDataset((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
        <Box textAlign="center" mb={2}><Typography variant="caption" color="error">{errorMessage}</Typography></Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

