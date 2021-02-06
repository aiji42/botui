import React, { FC, FormEvent, useCallback } from 'react'
import { TextField, Link, Grid } from '@material-ui/core'
import { FormWrapper } from './FormWrapper'
import { useLoginContext } from './use-login-context'

export const ResetPasswordForm: FC = () => {
  const [{ loading, error }, { resetPassword, setDataset }] = useLoginContext()
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      resetPassword()
    },
    [resetPassword]
  )
  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      error={error}
      buttonTitle="パスワードをリセットする"
      title="パスワードリセット"
      loading={loading}
      footerContent={<Footer />}
    >
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
        autoFocus
        onChange={(e) =>
          setDataset((prev) => ({ ...prev, password: e.target.value }))
        }
      />
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
    </FormWrapper>
  )
}

const Footer: FC = () => {
  const [, { resetPassword }] = useLoginContext()
  const handleResendCode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    resetPassword()
  }
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2" onClick={handleResendCode}>
          コードを再送する
        </Link>
      </Grid>
    </Grid>
  )
}
