import { FC, useCallback } from 'react'
import {
  Datagrid,
  EditView,
  useEditController,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  EditProps,
  CreateProps,
  useCreateController
} from 'react-admin'
import {
  EditingProposalData,
  EditingSessionData,
  Proposals,
  Session
} from '../../../@types/session'
import Dashboard from './Dashboard'
import CreateWizard from './CreateWizard'
import { Storage } from 'aws-amplify'

const isEditingProposalData = (arg: any): arg is EditingProposalData =>
  arg.proposalIndex !== undefined

export const SessionList: FC = (props) => {
  return (
    <List {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField source="title" sortable={false} />
        <BooleanField source="active" />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC<CreateProps> = (props) => {
  const createController = useCreateController(props)
  createController.setTransform((data) => {
    const proposals =
      data.template === 'inquiry' ? '[]' : data.template === 'ec' ? '[]' : '[]'
    return {
      title: data.title,
      proposals,
      active: false
    }
  })
  return <CreateWizard {...createController} />
}

const Edit: FC<EditProps> = (props) => {
  const { record, ...editController } = useEditController<Session>(props)
  const transform = useCallback(
    async (data: EditingProposalData | EditingSessionData) => {
      if (!record) return data
      if (isEditingProposalData(data)) {
        const { proposalIndex, ...restData } = data
        const newProposals = record.proposals.reduce<Proposals>(
          (res, proposal, index) =>
            index === proposalIndex ? [...res, restData] : [...res, proposal],
          []
        )
        if (record.proposals.length === proposalIndex)
          newProposals.push(restData)

        return { ...record, proposals: newProposals }
      }

      const { uploadableImages, ...restData } = data
      if (!uploadableImages) return restData

      const images = restData.images
      if (uploadableImages.logo) {
        const logo = uploadableImages.logo.rawFile
        const { key } = await Storage.put(
          `logo.${logo.name.split('.').slice(-1)[0]}`,
          logo,
          { level: 'protected', contentType: logo.type }
        )
        images.logo = key
      }

      return { ...restData, images }
    },
    [record]
  )
  editController.setTransform(transform)

  return <EditView {...props} {...editController} record={record} />
}

export const SessionEdit: FC = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()

  return (
    <Edit
      {...props}
      undoable={false}
      onSuccess={() => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, false)
        refresh()
      }}
    >
      <Dashboard />
    </Edit>
  )
}
