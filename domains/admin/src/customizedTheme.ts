import { defaultTheme } from 'react-admin'
import { blue, lightBlue } from '@material-ui/core/colors'

export const customizedTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: blue,
    secondary: lightBlue
  }
}