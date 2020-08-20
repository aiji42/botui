import { FC } from 'react'

type Props = {
  content: string | JSX.Element
}

const Content: FC<Props> = ({ content }) => (
  typeof (content) === 'string' ? <span dangerouslySetInnerHTML={{ __html: content }} /> : content
);

export default Content