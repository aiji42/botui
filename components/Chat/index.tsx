import { FC } from 'react'
import Message from './Message'
import { FormCustomInput, FormName, FormEmail, FormTel, FormAddress, FormBirthDay, FormCreditCard, FormCustomRadioGroup, FormCustomSelect, FormCustomTextarea } from '../Forms/Formik/Forms'

const Chat: FC = () => {
  const messages = [
    {
      content: 'テストです。',
      human: false,
    },
    {
      content: 'いい感じです',
      human: false,
    },
    {
      content: 'そうですね',
      human: true,
    },
    {
      content: <FormName onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormAddress onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormBirthDay onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormCreditCard onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormCustomRadioGroup name="sex" inputs={[{ title: '男性', value: 'male' }, {title: '女性', value: 'female'}]} onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormCustomSelect selects={[{ name: 'hoge', select: { title: 'aaaa' }, options: [{ value: '', label: '選択' }, { value: 'a', label: 'aaa' }] }]} onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormCustomTextarea name="hoge" title="aaa" onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormCustomInput inputs={[{ name: 'hoge', title: 'hjoe' }]} onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormTel onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
    {
      content: <FormEmail onSubmited={() => { }} onUpdate={() => { }} />,
      human: true
    },
  ]

  return (
    <div>
      {messages.map((msg, i) => (
        <Message {...msg} key={i} />
      ))}
    </div>
  )
}

export default Chat