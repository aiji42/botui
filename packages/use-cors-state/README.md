# use-cors-state

> Custom hooks for synchronizing state between different components, different windows, and cross-domains.

[![NPM](https://img.shields.io/npm/v/use-cors-state.svg)](https://www.npmjs.com/package/use-cors-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/aiji42/use-cors-state.svg?branch=master)](https://travis-ci.org/aiji42/use-cors-state) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Install

```bash
# when use npm
npm install --save use-cors-state

# when use yarn
yarn add use-cors-state
```

## DEMO

https://aiji42.github.io/use-cors-state/

## Usage

### Example for synchronizing state between different windows (e.g. iframe)
```jsx
// a componet in parent window
import React from 'react'
import { useCorsState } from 'use-cors-state'

const ExampleComponentParentWindow = ({ targetIframe }) => {
  const [state, setState] = useCorsState('example', { window: targetIframe.contentWindow }, '')
  return (
    <div>
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
    </div>
  )
}
```

```jsx
// a componet in child window
import React from 'react'
import { useCorsState } from 'use-cors-state'

const ExampleComponentChildWindow = () => {
  const [state, setState] = useCorsState('example', { window: window.parent }, '')
  return (
    <div>
      <p>inputted in parent: {state}</p>
    </div>
  )
}
```

When setState is executed, the state is synchronized between both windows.

Synchronization is possible from both sides, not only from parent to child, but also from child to parent.

## API

```js
const [state, setState] = useCorsState(synchronizingKey, options, initialValue)
```
- __synchronizingKey:__ `string`
    - Set the same key between components.
- __options:__ `OptionsType | undefined`
    - __window__: optional (Default value is self window)
        - The window in which the opponent's component exists.
    - __domain__: optional
        - This value can be used to restrict the domain.
    - See "OptionsType" below for more information.
- __initialValue:__ `any`
    - Initial value of the state.

#### OptionsType
```ts
// Server
// Loosely based on: https://github.com/krakenjs/post-robot/blob/master/src/public/server.js
type OptionsType = {
  handler?: (err: any) => void,
  errorHandler?: ({ source: Window, origin: string, data: Object }) => (void | any | ZalgoPromise<any>),
  window?: Window,
  name?: string,
  domain?: (string | RegExp | Array<string>),
  once?: boolean,
  errorOnClose?: boolean
};
```

### Example
```js
// synchronize to window of a iframe
useCorsState('exampleKey', { window: iframe.contentWindow }, { userId: 1002 })

// specific the domain of the parent window.
useCorsState('exampleKey', { window: window.parent, domain: 'http://example.com' }, { userId: 1002 })
```

## License

MIT © [aiji42](https://github.com/aiji42)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
