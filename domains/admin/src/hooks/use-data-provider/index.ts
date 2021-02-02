import {
  CreateParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams
} from 'react-admin'
import { buildDataProvider } from 'react-admin-amplify'
import { DataProvider } from 'react-admin-amplify/build/providers/DataProvider'
import { Session } from '@botui/types'
import { mutations, queries } from '@botui/api'

const sessionParse = (data: Session<string, string, string, string>): Session => {
  const proposals = data.proposals ? JSON.parse(data.proposals) : []
  const theme = data.theme ? JSON.parse(data.theme) : {}
  const images = data.images ? JSON.parse(data.images) : {}
  const launcher = data.launcher ? JSON.parse(data.launcher) : {}
  return { ...data, proposals, theme, images, launcher }
}

const sessionFormat = (data: Session): Session<string, string, string, string> => {
  const proposals = data.proposals ? JSON.stringify(data.proposals) : '[]'
  const theme = data.theme ? JSON.stringify(data.theme) : '{}'
  const images = data.images ? JSON.stringify(data.images) : '{}'
  const launcher = data.launcher ? JSON.stringify(data.launcher) : '{}'
  return { ...data, proposals, theme, images, launcher }
}

const defaultDataProvider = buildDataProvider({ queries, mutations })
const dataProvider = {
  ...defaultDataProvider,
  getList: async (resource: string, params: GetListParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getList(resource, params)

    const result = await defaultDataProvider.getList<
      Session<string, string, string, string>
    >(resource, params)
    return {
      ...result,
      data: result.data.map(sessionParse)
    }
  },
  getOne: async (resource: string, params: GetOneParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getOne(resource, params)

    const result = await defaultDataProvider.getOne<
      Session<string, string, string, string>
    >(resource, params)
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  getMany: async (resource: string, params: GetManyParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getMany(resource, params)

    const result = await defaultDataProvider.getMany<
      Session<string, string, string, string>
    >(resource, params)
    return {
      ...result,
      data: result.data.map(sessionParse)
    }
  },
  update: async (resource: string, params: UpdateParams) => {
    if (resource !== 'sessions')
      return defaultDataProvider.update(resource, params)

    const result = await defaultDataProvider.update<
      Session<string, string, string, string>
    >(resource, {
      ...params,
      data: sessionFormat(params.data)
    })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  create: async (resource: string, params: CreateParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.create(resource, params)

    const result = await defaultDataProvider.create<
      Session<string, string, string, string>
    >(resource, { ...params, data: { ...params.data } })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  }
} as DataProvider

export const useDataProvider = (): DataProvider => dataProvider
