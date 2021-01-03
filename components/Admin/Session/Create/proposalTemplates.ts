import {
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
  FormTel
} from '@botui/types'
import { v4 as uuidv4 } from 'uuid'
import {
  ProposalMessage,
  Proposals,
  ProposalSkipper,
  Skipper
} from '../../../../@types/session'

export const skipperTemplate = (skipper: Skipper): ProposalSkipper => {
  const id = uuidv4()
  return {
    id,
    type: 'skipper',
    completed: false,
    data: skipper
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
    before: '',
    after: '',
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
    before: '',
    after: '',
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
  stringMessageTemplate(
    '続きまして、お支払い方法・お届けに関してご質問させていただきます。'
  ),
  stringMessageTemplate('お支払い方法はいかがなさいますか？'),
  formMessageTemplate({
    selects: [
      {
        name: 'payment',
        options: [
          {
            label: '代引き',
            value: 'cash'
          },
          {
            label: 'クレジットカード',
            value: 'creditcard'
          }
        ],
        title: 'お支払い方法'
      }
    ],
    type: 'FormCustomSelect',
    status: {}
  }),
  stringMessageTemplate('クレジットカード情報、お支払回数をご入力ください。'),
  formMessageTemplate({
    type: 'FormCreditCard',
    status: {}
  }),
  formMessageTemplate({
    selects: [
      {
        name: 'paymentTime',
        options: [
          {
            label: '1回',
            value: '1'
          },
          {
            label: '2回',
            value: '2'
          },
          {
            label: '3回',
            value: '3'
          },
          {
            label: '4回',
            value: '4'
          },
          {
            label: '5回',
            value: '5'
          },
          {
            label: '6回',
            value: '6'
          },
          {
            label: '7回',
            value: '7'
          },
          {
            label: '8回',
            value: '8'
          },
          {
            label: '9回',
            value: '9'
          },
          {
            label: '10回',
            value: '10'
          }
        ],
        title: 'お支払い回数'
      }
    ],
    type: 'FormCustomSelect',
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
  })
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
  )
]

export const inquiry = JSON.stringify(inquiryProposals)
