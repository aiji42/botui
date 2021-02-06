import { defaultTheme } from 'react-admin'
import { colors } from '@material-ui/core'

export const customizedTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: colors.blue,
    secondary: colors.lightBlue
  }
}