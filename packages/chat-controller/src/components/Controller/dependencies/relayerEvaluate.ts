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
  job.dataMapper.forEach(({ from, to, converter }) => {
    const converterFunction = converter ? new Function('value', converter) : (value: unknown) => value
    if (form[to]) form[to].value = converterFunction(values[from])
  })
  const res = await pushForm(form)
  if (res.ok) {
    if (job.onCompleted === 'script' && job.completedScript) {
      new Function(job.completedScript)()
    }
  }
}

export const webhook = async (endpoint: string, values: Values): Promise<void> => {
  console.log(endpoint, values)
  // TODO:
}

export const relayerEvaluate = async (relayer: Relayer, values: Values): Promise<void> => {
  if (relayer.job === 'script') await evalFunction(relayer.script, values)
  if (relayer.job === 'webhook') await webhook(relayer.endpoint, values)
}
