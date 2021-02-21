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
  dataMapper: Array<{ from: string; to: string; converter?: string }>
  conditionOfComplete: string
  onCompleted: 'script' | 'message' | 'redirect'
  onFailed: 'script' | 'message' | 'retry' | 'redirect'
  completedScript?: string
  failedScript?: string
  maxRetry?: number
  completedMessage?: string
  failedMessage?: string
}

export type Relayer = JobScript | JobWebhook | JobFormPush

export type Closer = (JobScript | JobNone | JobStore | JobWebhook | JobFormPush) & {
  notify: boolean
}
