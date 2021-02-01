import React, { FC, lazy, Suspense } from 'react'
import { Global, css } from '@emotion/react'
import { globalStyle } from './globalStyle'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export const App: FC = () => {
  const Admin = lazy(() => import('./components/Admin'))
  const Chat = lazy(() => import('./components/Chat'))
  return (
    <BrowserRouter>
      <Global styles={css(globalStyle)} />
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}