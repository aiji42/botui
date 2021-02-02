import React, { FC } from 'react'
import { Layout } from 'react-admin'
import CustomizedAppBar from './CustomizedAppBar'

export const CustomizedLayout: FC = (props) => <Layout {...props} appBar={CustomizedAppBar} />
