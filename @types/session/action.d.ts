type URL = string
type Script = string

export interface Job<T extends string> {
  job: T
}
export interface JobScript extends Job<'script'> {
  script: Script
}
export type JobNone = Job<'none'>
export type JobStore = Job<'store'>
export interface JobWebhook extends Job<'webhook'> {
  endpoint: URL
}

export type Relayer = JobScript | JobWebhook

export type Closer = (JobScript | JobNone | JobStore | JobWebhook) & {
  notify: boolean
}
