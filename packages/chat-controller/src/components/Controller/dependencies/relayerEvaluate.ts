import { Relayer, JobFormPush } from '@botui/types'
import { pushForm } from './pushForm'

type Values = Record<string, unknown>

export const evalFunction = async (
  functionString: string,
  values: Values
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const func = new AsyncFunction('values', functionString)
  await func(values)
}

export const formPush = async (job: JobFormPush, values: Values): Promise<void> => {
  const form = document.querySelector<HTMLFormElement>(job.formSelector)
  if (!form) return
  job.dataMapper.forEach((mapper) => {
    if (!mapper.custom) {
      form[mapper.to].value = String(values[mapper.from])
      return
    }
    form[mapper.to].value = new Function('values', mapper.customValueScript)(values)
  })
  const res = await pushForm(form)
  new Function('response', job.onSubmit)(res)
}

export const webhook = async (endpoint: string, values: Values): Promise<void> => {
  console.log(endpoint, values)
  // TODO:
}

export const relayerEvaluate = async (relayer: Relayer, values: Values): Promise<void> => {
  if (relayer.job === 'script') await evalFunction(relayer.script, values)
  if (relayer.job === 'formPush') await formPush(relayer, values)
  if (relayer.job === 'webhook') await webhook(relayer.endpoint, values)
}
