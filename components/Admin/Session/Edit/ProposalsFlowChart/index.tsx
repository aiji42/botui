import { FC, CSSProperties } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Elements,
  Node,
  Edge,
  OnLoadFunc,
  ReactFlowProvider
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

  return (
    <ReactFlowProvider>
      <Grid container>
        <Grid item xs={9} style={{ height: '80vh' }}>
          <ReactFlow elements={convert(session.proposals)} onLoad={onLoad}>
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
  return (
    <List subheader={<ListSubheader>挿入</ListSubheader>}>
      <ListItem button>
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
