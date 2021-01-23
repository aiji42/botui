export interface Entry<T = string> {
  id: string
  owner: string
  sessionId: string
  inputs: T
  createdAt: string
  updatedAt: string
}
