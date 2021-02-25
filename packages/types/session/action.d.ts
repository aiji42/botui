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
export interface JobFormPush extends Job<'formPush'> {
  formSelector: string
  dataMapper: Array<{ from: string; to: string; convertable: boolean; converter?: string }>
  conditionOfComplete: string
  completedScript?: string
  failedScript?: string
  maxRetry?: number
}

export type Relayer = JobScript | JobWebhook | JobFormPush

export type Closer = (JobScript | JobNone | JobStore | JobWebhook | JobFormPush) & {
  notify: boolean
}
