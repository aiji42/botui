import { FC, useState, MouseEvent } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  minValue,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  FormDataConsumer
} from 'react-admin'
import {
  Menu,
  MenuItem,
  Fab,
  FabProps,
  makeStyles
} from '@material-ui/core'
import { useForm } from 'react-final-form'
import { Add } from '@material-ui/icons'

const operatorChoices = [
  { id: 'eq', name: '(数値) =' },
  { id: 'gt', name: '(数値) >' },
  { id: 'gteq', name: '(数値) >=' },
  { id: 'lt', name: '(数値) <' },
  { id: 'lteq', name: '(数値) <=' },
  { id: 'start', name: '(文字列) 前方一致' },
  { id: 'end', name: '(文字列) 後方一致' },
  { id: 'cont', name: '(文字列) 部分一致' },
  { id: 'match', name: '(文字列) 完全一致' },
  { id: 'regex', name: '(文字列) 正規表現' },
  { id: 'include', name: '(配列) 内包' },
  { id: 'true', name: 'TRUE' },
  { id: 'false', name: 'FALSE' },
  { id: 'null', name: 'NULL' }
]

const logicChoices = [
  { id: 'and', name: 'AND' },
  { id: 'or', name: 'OR' }
]

const useStyle = makeStyles((theme) => ({
  foundationForFab: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(1)
  }
}))


const ProposalSkipperFormInner: FC = () => {
  const classes = useStyle()
  return (
    <>
      <NumberInput
        source="data.skipNumber"
        validate={[required(), minValue(1)]}
        label="スキップ数"
      />
      <SelectInput
        source="data.logic"
        choices={logicChoices}
        validate={[required()]}
        label="各種条件の評価"
      />
      <ArrayInput source="data.conditions" label="条件" validate={[required()]}>
        <SimpleFormIterator>
          <FormDataConsumer>
            {({ scopedFormData, getSource }) => (
              <>
                <div className={classes.foundationForFab}>
                  <TextInput
                    source={getSource?.('key') ?? ''}
                    validate={[required()]}
                    label="値名"
                    fullWidth
                  />
                  <InsertKeyMenu
                    source={getSource?.('key') ?? ''}
                    className={classes.fab}
                  />
                </div>
                <SelectInput
                  source={getSource?.('operator') ?? ''}
                  choices={operatorChoices}
                  validate={[required()]}
                  label="評価"
                  fullWidth
                />
                {['eq', 'gt', 'lt', 'gteq', 'lteq'].includes(
                  scopedFormData?.operator
                ) && (
                  <NumberInput
                    source={getSource?.('pattern') ?? ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                {['start', 'end', 'cont', 'match', 'regex', 'include'].includes(
                  scopedFormData?.operator
                ) && (
                  <TextInput
                    source={getSource?.('pattern') ?? ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                <BooleanInput
                  source={getSource?.('negative') ?? ''}
                  label="否定(NOT)"
                />
              </>
            )}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

interface InsertKeyMenuProps extends Partial<FabProps> {
  source: string
}

const InsertKeyMenu: FC<InsertKeyMenuProps> = ({ source, ...res }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { change } = useForm()
  const handleClickMenu = (e: MouseEvent<HTMLLIElement>) => {
    change(source, e.currentTarget.dataset.value ?? '')
    handleClose()
  }
  return (
    <>
      <Fab
        {...res}
        color="primary"
        onClick={handleClick}
        size="small"
      >
        <Add fontSize="small" />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClickMenu} data-value="familyName">
          氏名:姓
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstName">
          氏名:名
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="familyNameKana">
          氏名:姓(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstNameKana">
          氏名:名(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="postalCode">
          住所:郵便番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="prefecture">
          住所:都道府県
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="city">
          住所:市区町村
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="street">
          住所:番地
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="building">
          住所:建物名・部屋番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="tel">
          電話番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="email">
          メールアドレス
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayYear">
          生年月日:年
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayMonth">
          生年月日:月
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayDay">
          生年月日:日
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProposalSkipperFormInner
