import { v4 as uuidv4 } from 'uuid'
import { Proposals } from '../../../../@types/session'

const ids: Array<string> = []
const makeId = (index: number) => {
  if (ids[index]) return ids[index]
  ids[index] = uuidv4()
  return ids[index]
}

const ecProposals: Proposals = [
  {
    id: makeId(0),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(0),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'いらっしゃいませ！'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(1),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(1),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: '私がご購入完了までサポートさせていただきます。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(2),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(2),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'まずはお名前を教えて下さい。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(3),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(3),
      content: {
        type: 'form',
        props: {
          type: 'FormName',
          status: {
            kana: true,
            kanaType: 'katakana'
          }
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(4),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(4),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children:
            '{{familyName}}{{firstName}}様ですね。ありがとうございます。続きまして、ご住所をお願いいたします。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(5),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(5),
      content: {
        type: 'form',
        props: {
          type: 'FormAddress'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(6),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(6),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children:
            'お届けのことでご連絡をさせていただくことがございます。電話番号とメールアドレスの入力をお願いいたします。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(7),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(7),
      content: {
        type: 'form',
        props: {
          type: 'FormTel'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(8),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(8),
      content: {
        type: 'form',
        props: {
          type: 'FormEmail'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(9),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(9),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'ご生年月日をご入力ください。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(10),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(10),
      content: {
        type: 'form',
        props: {
          type: 'FormBirthDay',
          status: {
            paddingZero: true
          }
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(11),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(11),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'お得なメールマガジンの登録はいかがでしょうか？'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(12),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(12),
      content: {
        type: 'form',
        props: {
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
          type: 'FormCustomRadioGroup'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(13),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(13),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children:
            '続きまして、お支払い方法・お届けに関してご質問させていただきます。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(14),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(14),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'お支払い方法は以下がなさいますか？'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(15),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(15),
      content: {
        type: 'form',
        props: {
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
          type: 'FormCustomSelect'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(16),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(16),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'クレジットカード情報、お支払回数をご入力ください。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(17),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(17),
      content: {
        type: 'form',
        props: {
          type: 'FormCreditCard'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(18),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(18),
      content: {
        type: 'form',
        props: {
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
          type: 'FormCustomSelect'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(19),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    data: {
      id: makeId(19),
      content: {
        delay: 500,
        type: 'string',
        props: {
          children: 'お届け希望日時を選択してください。'
        }
      },
      human: false,
      completed: false,
      updated: false
    }
  },
  {
    id: makeId(20),
    type: 'message',
    completed: false,
    before:
      'console.log(values, message);\nconst dateFormat = {\n  _fmt : {\n    "yyyy": function(date) { return date.getFullYear() + \'\'; },\n    "MM": function(date) { return (\'0\' + (date.getMonth() + 1)).slice(-2); },\n    "dd": function(date) { return (\'0\' + date.getDate()).slice(-2); },\n    "hh": function(date) { return (\'0\' + date.getHours()).slice(-2); },\n    "mm": function(date) { return (\'0\' + date.getMinutes()).slice(-2); },\n    "ss": function(date) { return (\'0\' + date.getSeconds()).slice(-2); }\n  },\n  _priority : ["yyyy", "MM", "dd", "hh", "mm", "ss"],\n  format: function(date, format){\n    return this._priority.reduce((res, fmt) => res.replace(fmt, this._fmt[fmt](date)), format)\n  }\n};\nconst sequentials = new Array(20)\n    .fill(null)\n    .map((_, i) => i + 2);\nmessage.content.props.selects[0].options = sequentials.map(sequence => {\n  const today = new Date();\n  today.setDate(today.getDate() + sequence);\n  const label = dateFormat.format(today, \'MM月dd日\');\n  const value = dateFormat.format(today, \'yyyy-MM-dd\');  \n  return { label, value };\n})',
    after: '',
    data: {
      id: makeId(20),
      content: {
        type: 'form',
        props: {
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
          type: 'FormCustomSelect'
        }
      },
      human: true,
      completed: false,
      updated: false
    }
  }
]

export const ec = JSON.stringify(ecProposals)

export const inquiry = JSON.stringify([
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'こんにちは。'
      }
    }
  },
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'お問い合わせの内容で当てはまるものを選択して下さい。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'form',
      props: {
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
        required: true
      }
    }
  },
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: '続いてお名前を教えて下さい。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'form',
      props: {
        type: 'FormName',
        status: {
          kana: true,
          kanaType: 'hiragana'
        }
      }
    }
  },
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'ご連絡先をご入力ください。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'form',
      props: {
        type: 'FormEmail'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'form',
      props: {
        type: 'FormTel'
      }
    }
  },
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      delay: 500,
      type: 'string',
      props: {
        children:
          'ありがとうございます。他になにかお伝え事項がございましたら、ご入力をお願いします。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'form',
      props: {
        name: 'note',
        type: 'FormCustomTextarea',
        title: 'お伝え事項'
      }
    }
  },
  {
    id: uuidv4(),
    type: 'message',
    completed: false,
    before: '',
    after: '',
    content: {
      type: 'string',
      delay: 500,
      props: {
        children:
          'ありがとうございます。ご入力いただいた内容でお問い合わせを承りました。後ほど弊社担当からご連絡を差し上げます。'
      }
    }
  }
])
