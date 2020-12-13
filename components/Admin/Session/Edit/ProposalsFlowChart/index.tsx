import { FC, CSSProperties, useState, useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Elements,
  Node,
  Edge,
  OnLoadFunc,
  ReactFlowProvider,
  OnEdgeUpdateFunc,
  ReactFlowProps,
  updateEdge,
  addEdge,
  removeElements,
  useStoreActions,
  useStoreState
} from 'react-flow-renderer'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar
} from '@material-ui/core'
import {
  TextFields as TextIcon,
  BorderColor as PenIcon,
  Image as ImageIcon
} from '@material-ui/icons'
import { Proposals, Proposal, Session } from '../../../../../@types/session'
import nl2br from 'react-nl2br'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import { useFormState } from 'react-final-form'
import { v4 as uuidv4 } from 'uuid'

const Label = (props: Proposal) => {
  return (
    <>
      {props.content.type === 'string' &&
        (typeof props.content.props.children === 'string'
          ? nl2br(props.content.props.children)
          : props.content.props.children)}
      {props.content.type === 'form' && props.content.props.type}
      {props.content.type === 'image' && (
        <AmplifyS3Image
          {...props.content.props}
          style={({ '--width': '100%' } as unknown) as CSSProperties}
        />
      )}
    </>
  )
}

const convert = (proposals: Proposals): Elements => {
  return proposals.reduce<Elements>((res, proposal, index) => {
    const node: Node = {
      id: `${proposal.id}`,
      type:
        index === 0
          ? 'input'
          : index === proposals.length - 1
          ? 'output'
          : 'default',
      data: {
        label: <Label {...proposal} />
      },
      position: { x: 400 + (proposal.human ? 80 : -80), y: index * 100 }
    }
    if (index === 0) return [...res, node]

    const prev = proposals[index - 1]
    const edge: Edge = {
      id: `e${prev.id}-${proposal.id}`,
      source: `${prev.id}`,
      target: `${proposal.id}`
    }
    return [...res, node, edge]
  }, [])
}

const onLoad: OnLoadFunc = (reactFlowInstance) => {
  reactFlowInstance.fitView()
}

const ProposalsFlowChart: FC = () => {
  const { values: session } = useFormState<Session>()
  const [elements, setElements] = useState<Elements>(convert(session.proposals))

  const onEdgeUpdate = useCallback<OnEdgeUpdateFunc>(
    (oldEdge, newConnection) =>
      setElements((els) => updateEdge(oldEdge, newConnection, els)),
    [setElements]
  )
  const onConnect = useCallback<Required<ReactFlowProps>['onConnect']>(
    (params) => setElements((els) => addEdge(params, els)),
    [setElements]
  )
  const onElementsRemove = useCallback<
    Required<ReactFlowProps>['onElementsRemove']
  >(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    [setElements]
  )

  return (
    <ReactFlowProvider>
      <Grid container>
        <Grid item xs={9} style={{ height: '80vh' }}>
          <ReactFlow
            elements={elements}
            onLoad={onLoad}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </ReactFlowProvider>
  )
}

const Sidebar: FC = () => {
  const setElements = useStoreActions((actions) => actions.setElements)
  const elements = useStoreState((state) => state.elements)
  const addNode = useCallback(
    (newNode: Node) => {
      setElements([...elements, newNode])
    },
    [setElements, elements]
  )

  return (
    <List subheader={<ListSubheader>挿入</ListSubheader>}>
      <ListItem
        button
        onClick={() =>
          addNode({
            id: uuidv4(),
            data: { label: 'ffragregeawefa' },
            position: { x: 0, y: 0 }
          })
        }
      >
        <ListItemAvatar>
          <TextIcon />
        </ListItemAvatar>
        <ListItemText primary="文章" />
      </ListItem>
      <ListItem button>
        <ListItemAvatar>
          <ImageIcon />
        </ListItemAvatar>
        <ListItemText primary="画像" />
      </ListItem>
      <ListItem button>
        <ListItemAvatar>
          <PenIcon />
        </ListItemAvatar>
        <ListItemText primary="入力フォーム" />
      </ListItem>
    </List>
  )
}

export default ProposalsFlowChart
