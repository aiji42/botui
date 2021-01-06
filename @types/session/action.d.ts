import Condition from 'yup/lib/Condition'

type Email = string
type URL = string
type Script = string

interface Job<T extends string> {
  job: T
}
interface JobScript extends Job<'script'> {
  script: Script
}
type JobNone = Job<'none'>
type JobStore = Job<'store'>
interface JobWebhook extends Job<'webhook'> {
  endpoint: URL
}

type Relayer = JobScript | JobWebhook

type Closer = (JobScript | JobNone | JobStore | JobWebhook) & {
  notify: boolean
  notifyTo?: Email
}
