import { FC, useEffect, useState, useContext } from 'react'
import String from './String'
import Form from './Form'
import Loading from './Loading'
import { useMessageContext } from '../../../../hooks/use-message-context'

const Content: FC = () => {
  const { message: { content: { delay, type } } } = useMessageContext()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (!delay) {
      setLoading(false)
      return
    }
    setTimeout(() => setLoading(false), delay)
  }, [])

  if (loading) return <Loading />
  if (type === 'form') return <Form />
  if (type === 'string') return <String />
  return <></>
}

export default Content