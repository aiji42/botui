import React, { FC, FormEvent, useCallback } from 'react'
import { TextField, Link, Grid } from '@material-ui/core'
import { FormWrapper } from './FormWrapper'
import { Mode, useLoginContext } from './use-login-context'

export const ForgotPasswordForm: FC = () => {
  const [{ loading, error, email }, { forgotPassword, setDataset }] = useLoginContext()
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      forgotPassword()
    },
    [forgotPassword]
  )
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      error={error}
      buttonTitle="リセット用の確認コードを受取る"
      title="パスワードリセット"
      loading={loading}
      footerContent={<Footer />}
    >
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
    </FormWrapper>
  )
}

const Footer: FC = () => {
  const [, { setDataset }] = useLoginContext()
  const handleSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setDataset((prev) => ({ ...prev, mode: Mode.SIGN_IN}))
  }
  const handleSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setDataset((prev) => ({ ...prev, mode: Mode.SIGN_UP}))
  }
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2" onClick={handleSignIn}>
          サインイン
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
