import { FC, useEffect, useState, useContext } from 'react'
import String, { StringType } from './String'
import Form, { FormType } from './Form'
import Loading from './Loading'
import { MessageContext } from '../..'

interface ContentFormType {
  type: 'form'
  props: FormType
}

interface ContentStringType {
  type: 'string'
  props: StringType
}

export type ContentType = {
  delay?: number
} & (ContentFormType | ContentStringType)

const Content: FC = () => {
  const { message: { content: { delay, type } } } = useContext(MessageContext)
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