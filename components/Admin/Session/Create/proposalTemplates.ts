import { v4 as uuidv4 } from 'uuid'

export const ec = JSON.stringify([
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'いらっしゃいませ！'
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: '私がご購入完了までサポートさせていただきます。'
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'まずはお名前を教えて下さい。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormName',
        status: {
          kana: true,
          kanaType: 'katakana'
        }
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children:
          '{{familyName}}{{firstName}}様ですね。ありがとうございます。続きまして、ご住所をお願いいたします。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormAddress'
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children:
          'お届けのことでご連絡をさせていただくことがございます。電話番号とメールアドレスの入力をお願いいたします。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormTel'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormEmail'
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'ご生年月日をご入力ください。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormBirthDay',
        status: {
          paddingZero: true
        }
      }
    }
  },
  {
    human: false,
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'お得なメールマガジンの登録はいかがでしょうか？'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
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
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children:
          '続きまして、お支払い方法・お届けに関してご質問させていただきます。'
      }
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'お支払い方法は以下がなさいますか？'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
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
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'クレジットカード情報、お支払回数をご入力ください。'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
    content: {
      type: 'form',
      props: {
        type: 'FormCreditCard'
      }
    }
  },
  {
    human: true,
    id: uuidv4(),
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
    }
  },
  {
    id: uuidv4(),
    content: {
      delay: 500,
      type: 'string',
      props: {
        children: 'お届け希望日時を選択してください。'
      }
    }
  },
  {
    before:
      'console.log(values, message);\nconst dateFormat = {\n  _fmt : {\n    "yyyy": function(date) { return date.getFullYear() + \'\'; },\n    "MM": function(date) { return (\'0\' + (date.getMonth() + 1)).slice(-2); },\n    "dd": function(date) { return (\'0\' + date.getDate()).slice(-2); },\n    "hh": function(date) { return (\'0\' + date.getHours()).slice(-2); },\n    "mm": function(date) { return (\'0\' + date.getMinutes()).slice(-2); },\n    "ss": function(date) { return (\'0\' + date.getSeconds()).slice(-2); }\n  },\n  _priority : ["yyyy", "MM", "dd", "hh", "mm", "ss"],\n  format: function(date, format){\n    return this._priority.reduce((res, fmt) => res.replace(fmt, this._fmt[fmt](date)), format)\n  }\n};\nconst sequentials = new Array(20)\n    .fill(null)\n    .map((_, i) => i + 2);\nmessage.content.props.selects[0].options = sequentials.map(sequence => {\n  const today = new Date();\n  today.setDate(today.getDate() + sequence);\n  const label = dateFormat.format(today, \'MM月dd日\');\n  const value = dateFormat.format(today, \'yyyy-MM-dd\');  \n  return { label, value };\n})',
    human: true,
    id: uuidv4(),
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
    }
  }
])

export const inquiry = JSON.stringify([
  {
    id: uuidv4(),
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
    content: {
      type: 'form',
      props: {
        type: 'FormTel'
      }
    }
  },
  {
    id: uuidv4(),
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
