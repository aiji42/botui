import { FC, useCallback } from 'react'
import { useForm, useField } from 'react-final-form'
import { Card, CardMedia, CardActionArea, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  selectedRadioImageCard: {
    border: 'solid',
    borderColor: theme.palette.primary.main
  }
}))

interface Props {
  source: string
  value: string
  image?: string
}

const RadioImageCard: FC<Props> = ({ source, value, image }) => {
  const { change } = useForm()
  const {
    input: { value: selectedValue }
  } = useField(source)
  const handleClick = useCallback(() => {
    change(source, value)
  }, [change, source, value])
  const classes = useStyles()
  return (
    <Card
      className={selectedValue === value ? classes.selectedRadioImageCard : ''}
    >
      <CardActionArea value={value} onClick={handleClick}>
        <CardMedia component="img" src={image} />
      </CardActionArea>
    </Card>
  )
}

export default RadioImageCard
