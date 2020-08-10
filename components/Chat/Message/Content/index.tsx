import { FC, ReactElement } from 'react'

type Props = {
  content: string | ReactElement
}

const Content: FC<Props> = ({ content }) => (
  typeof (content) === 'string' ? <span dangerouslySetInnerHTML={{ __html: content }} /> : content
);

export default Content