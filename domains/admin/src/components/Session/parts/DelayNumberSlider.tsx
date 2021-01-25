import { useCallback, FC } from 'react'
import { Labeled } from 'react-admin'
import { Slider } from '@material-ui/core'
import { useForm, useField } from 'react-final-form'

const marks = [
  {
    value: 0,
    label: '0s'
  },
  {
    value: 1000,
    label: '1s'
  },
  {
    value: 2000,
    label: '2s'
  },
  {
    value: 3000,
    label: '3s'
  }
]

interface Props {
  label?: string
  fullWidth?: boolean
  source: string
}

const DelayNumberSlider: FC<Props> = (props) => {
  const { change } = useForm()
  const {
    input: { value }
  } = useField<number>(props.source)
  const handleChange = useCallback(
    (_, val: number | number[]) => {
      change(props.source, val)
    },
    [props.source, change]
  )

  return (
    <Labeled {...props}>
      <span>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => <>{val / 1000}s</>}
          step={100}
          marks={marks}
          min={0}
          max={3000}
          value={value || 0}
          onChange={handleChange}
        />
      </span>
    </Labeled>
  )
}

export default DelayNumberSlider
