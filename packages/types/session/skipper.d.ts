export type SkipperConditionOperator =
  | 'eq'
  | 'gt'
  | 'gteq'
  | 'lt'
  | 'lteq'
  | 'start'
  | 'end'
  | 'cont'
  | 'match'
  | 'regex'
  | 'include'
  | 'true'
  | 'false'
  | 'null'

export interface SkipperCondition {
  key: string
  operator: SkipperConditionOperator
  pattern?: number | string | boolean
  negative: boolean
}

type SkipperLogic = 'and' | 'or'

export interface Skipper {
  skipNumber: number
  conditions: Array<SkipperCondition>
  logic: SkipperLogic
}
