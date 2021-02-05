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
  const [{ mode, email, password }, controller] = useState({ mode: 'SignIn', email: '', password: '' })

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {mode === 'SignIn' && <SignIn email={email} controller={controller} />}
        {mode === 'SignUp' && <SignUp controller={controller} />}
        {mode === 'ConfirmSignUp' && (
          <ConfirmSignUp email={email} controller={controller} password={password} />
        )}
        {mode === 'ForgotPassword' && (
          <ForgotPassword email={email} controller={controller} />
        )}
        {mode === 'ResetPassword' && (
          <ResetPassword email={email} controller={controller} />
        )}
      </Grid>
    </Grid>
  )
}

type Controller = React.Dispatch<React.SetStateAction<{
  mode: string
  email: string
  password: string
}>>

const SignIn: FC<{ controller: Controller; email: string }> = ({ controller, email: defaultEmail }) => {
  const classes = useStyles()
  const [{ email, password }, setDataset] = useState({
    email: defaultEmail,
    password: ''
  })
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.signIn(email, password)
        .then(() => history.push('/'))
        .catch((err) => {
          if (err.code === 'UserNotConfirmedException') {
            controller({ mode: 'ConfirmSignUp', email, password: '' })
          }
          setErrorMessage(I18n.get(err.message))
        })
    },
    [email, password, history, controller]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        サインイン
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={defaultEmail}
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
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
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
          サインイン
        </Button>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link
            variant="body2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              controller({ mode: 'ForgotPassword', email, password: '' })
            }}
          >
            パスワードを忘れた場合はこちら
          </Link>
        </Grid>
        <Grid item>
          <Link
            variant="body2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              controller({ mode: 'SignUp', email, password: '' })
            }}
          >
            新規登録
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const SignUp: FC<{ controller: Controller }> = ({ controller }) => {
  const classes = useStyles()
  const [{ email, password }, setDataset] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.signUp(email, password)
        .then(() => controller({ mode: 'ConfirmSignUp', email, password }))
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, password, controller]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        新規登録
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
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
          label="パスワード"
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
          確認コードを受取る
        </Button>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link
            variant="body2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              controller({ mode: 'SignIn', email, password: '' })
            }}
          >
            サインイン
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ConfirmSignUp: FC<{ email: string; password: string; controller: Controller }> = ({ email, password, controller }) => {
  const classes = useStyles()
  const [{ code }, setDataset] = useState({
    code: ''
  })
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.confirmSignUp(email, code)
        .then(() => {
          if (!password) {
            controller({ mode: 'SignIn', email, password: '' })
            return
          }
          Auth.signIn(email, password)
            .then(() => history.push('/'))
            .catch((err) => setErrorMessage(I18n.get(err.message)))
        })
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, code, password, history, controller]
  )
  const handleResendCode = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      Auth.resendSignUp(email).catch((err) =>
        setErrorMessage(I18n.get(err.message))
      )
    },
    [email]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        アカウント認証
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="code"
          label="確認コード(メールをご確認ください)"
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
          アカウントを認証する
        </Button>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link variant="body2" onClick={handleResendCode}>
            確認コードを再送する
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ForgotPassword: FC<{ controller: Controller; email: string }> = ({
  controller, email: defaultEmail
}) => {
  // メアド
  const classes = useStyles()
  const [{ email }, setDataset] = useState({ email: defaultEmail })
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      Auth.forgotPassword(email)
        .then(() => controller({ mode: 'ResetPassword', email, password: '' }))
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, controller]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        パスワードリセット
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={defaultEmail}
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
          リセット用の確認コードを受取る
        </Button>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link
            variant="body2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              controller((prev) => ({ ...prev, mode: 'SignIn' }))
            }}
          >
            サインイン
          </Link>
        </Grid>
        <Grid item>
          <Link
            variant="body2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault()
              controller((prev) => ({ ...prev, mode: 'SignUp' }))
            }}
          >
            新規登録
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

const ResetPassword: FC<{ email: string; controller: Controller }> = ({ email, controller }) => {
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
        .then(() => controller({ mode: 'SignIn', email, password: '' }))
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email, code, password, controller]
  )
  const handleResendCode = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      Auth.forgotPassword(email)
        .catch((err) => setErrorMessage(I18n.get(err.message)))
    },
    [email]
  )
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        パスワードリセット
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="code"
          label="確認コード(メールをご確認ください)"
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
          label="新しいパスワード"
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
          パスワードをリセットする
        </Button>
        <Box textAlign="center" mb={2}>
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Grid container>
        <Grid item xs>
          <Link variant="body2" onClick={handleResendCode}>
            コードを再送する
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

