import { FC } from 'react'
import { required } from 'react-admin'
import { Field, useField } from 'react-final-form'
import { Grid, FormHelperText } from '@material-ui/core'
import RadioImageCard from './RadioImageCard'

const themeColors = [
  {
    image: '/theme-color-1.png',
    style: {
      header: { backgroundColor: '#00B900' },
      footer: { backgroundColor: '#98EA98' },
      agent: { backgroundColor: '#00B900', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#00B900' }
    }
  },
  {
    image: '/theme-color-2.png',
    style: {
      header: { backgroundColor: '#69C9D0' },
      footer: { backgroundColor: '#69C9D0' },
      agent: { backgroundColor: '#69C9D0', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#EE1D52' }
    }
  },
  {
    image: '/theme-color-3.png',
    style: {
      header: { backgroundColor: '#FD94D3' },
      footer: { backgroundColor: '#2576EF' },
      agent: { backgroundColor: '#2576EF', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#0F00B9' }
    }
  },
  {
    image: '/theme-color-4.png',
    style: {
      header: { backgroundColor: '#F9A36C' },
      footer: { backgroundColor: '#305E7A' },
      agent: { backgroundColor: '#F26728', color: '#FFFFFF' },
      user: { backgroundColor: '#E5E5E5', color: '#898989' },
      progressBar: { backgroundColor: '#9CD7D2' }
    }
  }
]

const ThemeColorSelector: FC = () => {
  const input = useField('theme')
  return (
    <>
      {themeColors.map(({ image, style }, index) => (
        <Grid item xs={2} key={index}>
          <RadioImageCard
            source="theme"
            value={JSON.stringify(style)}
            image={image}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Field
          name="theme"
          component="input"
          type="hidden"
          validate={required('選択してください')}
        />
        <FormHelperText margin="dense" error>
          {input.meta.touched && input.meta.error}
        </FormHelperText>
      </Grid>
    </>
  )
}

export default ThemeColorSelector
