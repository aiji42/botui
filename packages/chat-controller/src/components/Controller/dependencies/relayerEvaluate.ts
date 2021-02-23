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

export const formPush = async (job: JobFormPush, values: Values, retried = 0): Promise<void> => {
  try {
    const form = document.querySelector<HTMLFormElement>(job.formSelector)
    if (!form) return
    job.dataMapper.forEach(({ from, to, converter }) => {
      const converterFunction = converter ? new Function('value', 'values', converter) : String
      if (form[to]) form[to].value = converterFunction(values[from], values)
    })
    const res = await pushForm(form)
    const isCompleted = res.ok && new Function('response', job.conditionOfComplete)(res)
    if (isCompleted) {
      if (job.completedScript) new Function(job.completedScript)()
    } else throw new Error('form push failed.')
  } catch (e) {
    console.error(e)
    if (retried < Number(job.maxRetry))
      return await formPush(job, values, retried + 1)
    else if (job.failedScript) new Function(job.failedScript)()
  }
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
