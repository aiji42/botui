import { FC } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Typography
} from '@material-ui/core'
import { Session } from '../../../../../@types/session'

interface SessionCardProps extends Pick<Session, 'title' | 'active'> {
  onClickEdit: () => void
  onClickPreview: () => void
}

const SessionCard: FC<SessionCardProps> = (props) => {
  const { title, active, onClickEdit, onClickPreview } = props

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          ステータス
        </Typography>
        <Typography variant="subtitle1">
          {active ? '稼働中' : '停止'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClickPreview}>
          Preview
        </Button>
        <Button size="small" color="primary" onClick={onClickEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  )
}

export default SessionCard
