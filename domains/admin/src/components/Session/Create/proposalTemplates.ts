import { v4 as uuidv4 } from 'uuid'
import {
  ProposalMessage,
  Proposals,
  ProposalSkipper,
  Skipper,
  FormAddress,
  FormBirthDay,
  FormConfirm,
  FormCreditCard,
  FormCustomCheckbox,
  FormCustomInput,
  FormCustomRadioGroup,
  FormCustomSelect,
  FormCustomTextarea,
  FormEmail,
  FormName,
  FormTel,
  ProposalCloser,
  ProposalRelayer,
  Closer,
  Relayer
} from '@botui/types'

export const skipperTemplate = (skipper: Skipper): ProposalSkipper => {
  const id = uuidv4()
  return {
    id,
    type: 'skipper',
    completed: false,
    data: skipper
  }
}

export const closerTemplate = (closer: Closer): ProposalCloser => {
  const id = uuidv4()
  return {
    id,
    type: 'closer',
    completed: false,
    data: closer
  }
}

export const relayerTemplate = (relayer: Relayer): ProposalRelayer => {
  const id = uuidv4()
  return {
    id,
    type: 'relayer',
    completed: false,
    data: relayer
  }
}

export const stringMessageTemplate = (
  message: string,
  delay = 500,
  human = false
): ProposalMessage => {
  const id = uuidv4()
  return {
    id,
    type: 'message',
    completed: false,
    data: {
      id,
      content: {
        delay,
        type: 'string',
        props: {
          children: message
        }
      },
      human,
      completed: false,
      updated: false
    }
  }
}

const noop = () => {
  // no op
}

type OmittedForm =
  | Omit<FormAddress, 'onSubmitted' | 'values'>
  | Omit<FormBirthDay, 'onSubmitted' | 'values'>
  | Omit<FormConfirm, 'onSubmitted' | 'values'>
  | Omit<FormCreditCard, 'onSubmitted' | 'values'>
  | Omit<FormCustomInput, 'onSubmitted' | 'values'>
  | Omit<FormCustomSelect, 'onSubmitted' | 'values'>
  | Omit<FormCustomCheckbox, 'onSubmitted' | 'values'>
  | Omit<FormCustomRadioGroup, 'onSubmitted' | 'values'>
  | Omit<FormCustomTextarea, 'onSubmitted' | 'values'>
  | Omit<FormEmail, 'onSubmitted' | 'values'>
  | Omit<FormName, 'onSubmitted' | 'values'>
  | Omit<FormTel, 'onSubmitted' | 'values'>

export const formMessageTemplate = (form: OmittedForm): ProposalMessage => {
  const id = uuidv4()
  const newForm = {
    ...form,
    values: {},
    onSubmitted: noop
  }
  return {
    id,
    type: 'message',
    completed: false,
    data: {
      id,
      content: {
        delay: 0,
        type: 'form',
        props: newForm
      },
      human: true,
      completed: false,
      updated: false
    }
  }
}

const ecProposals: Proposals = [
  stringMessageTemplate('いらっしゃいませ！'),
  stringMessageTemplate('私がご購入完了までサポートさせていただきます。'),
  stringMessageTemplate('まずはお名前を教えて下さい。'),
  formMessageTemplate({
    type: 'FormName',
    status: {
      kana: true,
      kanaType: 'katakana'
    }
  }),
  stringMessageTemplate(
    '{{familyName}}{{firstName}}様ですね。ありがとうございます。続きまして、ご住所をお願いいたします。'
  ),
  formMessageTemplate({
    type: 'FormAddress',
    status: {}
  }),
  stringMessageTemplate(
    'お届けのことでご連絡をさせていただくことがございます。電話番号とメールアドレスの入力をお願いいたします。'
  ),
  formMessageTemplate({
    type: 'FormTel',
    status: {}
  }),
  formMessageTemplate({
    type: 'FormEmail',
    status: {}
  }),
  stringMessageTemplate('ご生年月日をご入力ください。'),
  formMessageTemplate({
    type: 'FormBirthDay',
    status: {
      paddingZero: true
    }
  }),
  stringMessageTemplate('お得なメールマガジンの登録はいかがでしょうか？'),
  formMessageTemplate({
    inputs: [
      {
        title: '登録する',
        value: 'true'
      },
      {
        title: '登録しない',
        value: 'false'
      }
    ],
    name: 'mailmagazine',
    type: 'FormCustomRadioGroup',
    status: {}
  }),
  stringMessageTemplate('お届け希望日時を選択してください。'),
  formMessageTemplate({
    selects: [
      {
        name: 'deliveryDate',
        options: [
          {
            label: 'dummy',
            value: 'dummy'
          }
        ],
        title: 'お届け日'
      },
      {
        name: 'deliveryTime',
        options: [
          {
            label: '午前中',
            value: 'am'
          },
          {
            label: '12:00-15:00',
            value: '12_15'
          },
          {
            label: '15:00-18:00',
            value: '15_18'
          },
          {
            label: '18:00-21:00',
            value: '18_21'
          }
        ],
        title: 'お届け時間帯'
      }
    ],
    type: 'FormCustomSelect',
    status: {}
  }),
  closerTemplate({ job: 'store', notify: false })
]

export const ec = JSON.stringify(ecProposals)

const inquiryProposals: Proposals = [
  stringMessageTemplate('こんにちは。'),
  stringMessageTemplate('お問い合わせの内容で当てはまるものを選択して下さい。'),
  formMessageTemplate({
    inputs: [
      {
        title: '資料がほしい',
        value: 'document'
      },
      {
        title: '話を聞きいてみたい',
        value: 'hearing'
      },
      {
        title: 'その他',
        value: 'other'
      }
    ],
    name: 'inquiry',
    type: 'FormCustomCheckbox',
    required: true,
    status: {}
  }),
  stringMessageTemplate('続いてお名前を教えて下さい。'),
  formMessageTemplate({
    type: 'FormName',
    status: {
      kana: true,
      kanaType: 'katakana'
    }
  }),
  stringMessageTemplate('ご連絡先をご入力ください。'),
  formMessageTemplate({
    type: 'FormTel',
    status: {}
  }),
  formMessageTemplate({
    type: 'FormEmail',
    status: {}
  }),
  stringMessageTemplate(
    'ありがとうございます。他になにかお伝え事項がございましたら、ご入力をお願いします。'
  ),
  formMessageTemplate({
    name: 'note',
    type: 'FormCustomTextarea',
    title: 'お伝え事項',
    status: {}
  }),
  stringMessageTemplate(
    'ありがとうございます。ご入力いただいた内容でお問い合わせを承りました。後ほど弊社担当からご連絡を差し上げます。'
  ),
  closerTemplate({ job: 'store', notify: false })
]

export const inquiry = JSON.stringify(inquiryProposals)

const customProposals: Proposals = [
  closerTemplate({ job: 'store', notify: false })
]

export const custom = JSON.stringify(customProposals)
