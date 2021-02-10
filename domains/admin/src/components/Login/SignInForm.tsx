import React, { FC, FormEvent, useCallback } from 'react'
import {
  TextField,
  Link,
  Grid,
  Box,
  Divider
} from '@material-ui/core'
import { FormWrapper } from './FormWrapper'
import { Mode, useLoginContext } from './use-login-context'
import GoogleButton from 'react-google-button'

export const SignInForm: FC = () => {
  const [
    { loading, error, email },
    { signIn, setDataset, signInByGoogle }
  ] = useLoginContext()
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signIn()
    },
    [signIn]
  )
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      error={error}
      buttonTitle="サインイン"
      title="サインイン"
      loading={loading}
      footerContent={<Footer />}
    >
      <Box mb={2}>
        <GoogleButton
          onClick={signInByGoogle}
          style={{ width: '100%' }}
          label="Googleアカウントでサインイン"
        />
      </Box>
      <Divider />
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
        value={email}
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
    </FormWrapper>
  )
}

const Footer: FC = () => {
  const [, { setDataset }] = useLoginContext()
  const handleForgotPassword = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setDataset((prev) => ({ ...prev, mode: Mode.FORGOT_PASSWORD }))
  }
  const handleSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setDataset((prev) => ({ ...prev, mode: Mode.SIGN_UP }))
  }
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2" onClick={handleForgotPassword}>
          パスワードを忘れた場合はこちら
        </Link>
      </Grid>
      <Grid item>
        <Link variant="body2" onClick={handleSignUp}>
          新規登録
        </Link>
      </Grid>
    </Grid>
  )
}