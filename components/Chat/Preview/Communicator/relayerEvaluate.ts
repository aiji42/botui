import { Relayer } from '../../../../@types/session/action'

type Values = Record<string, unknown>

export const evalFunction = (functionString: string, values: Values): void => {
  // eslint-disable-next-line no-new-func
  const func = new Function('values', functionString)
  func(values)
  // TODO: 非同期を考慮
}

export const webhook = (endpoint: string, values: Values): void => {
  console.log(endpoint, values)
  // TODO:
}

export const relayerEvaluate = (relayer: Relayer, values: Values): void => {
  if (relayer.job === 'script') evalFunction(relayer.script, values)
  if (relayer.job === 'webhook') webhook(relayer.endpoint, values)
}
