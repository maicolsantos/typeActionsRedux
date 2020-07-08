# TypeActionsRedux

```
yarn add type-actions-redux
```

We know that using Redux can be a bit verbose, with TypeActionsRedux you
in addition to writing little, keep their types and actions organized.

### How we do it when we use redux

First we create a file that contains the types.

```js
// types.js

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
```

Then we create another file that contains our actions.

```js
// actions.js

import * as types from './types'

export function increment() {
  return {
    type: types.INCREMENT,
  }
}

export function decrement() {
  return {
    type: types.DECREMENT,
  }
}
```

### Using TypeActionsRedux

With TypeActionsRedux you create an object that has the objective of creating a
type constant and one-time action function.

That way you abstract the verbosity of writing two files

```js
import { typeActionsRedux } from 'type-actions-redux'

const { actions, types } = typeActionsRedux('scope', {
  increment: () => ({}),
  decrement: () => ({}),
})
```

### Create actions with parameters

```js
import { typeActionsRedux } from 'type-actions-redux'

const { actions, types } = typeActionsRedux('user', {
  getUserData: (id) => ({ meta: { id } }),
  setUserData: (data) => ({ payload: { data } }),
})
```

### Output TypeActionsRedux

What typeActionsRedux does is to export two objects, `types` and` actions`.

```js
// Output typeActionsRedux

export const types = {
  GET_USER_DATA = 'user/GET_USER_DATA'
  SET_USER_DATA = 'user/SET_USER_DATA'
}

export const actions = {
  getUserData(id) {
    return {
      type: types.GET_USER_DATA,
      meta: { id },
    }
  },
  setUserData(data) {
    return {
      type: types.GET_USER_DATA,
      payload: { data },
    }
  },
}

```
### Example using redux-saga

Remember that the name of the function in typeActionsRedux will be the same name used in `types` and` actions`,
being that in `types` he receives modifications to be uppercase and underline in cases of camelCase.

So when using a `type` in the saga for example, just use it like this

```js
import { takeLatest } from 'redux-saga/effects'

import { types } from './actions'

function* getUserData({ meta: { id }}) {
  ...
}

export default function* () {
  yield takeLatest(
    types.GET_USER_DATA,
    getUserDataSaga,
  )
}
```

### How to use in the project

```jsx
import React from 'react'
import { useDispatch } from 'react-redux'

import { actions } from './actions'

const App = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    const id = 1

    dispatch(actions.getUserData(id))
  }

  return (
    <button onClick={handleClick}>
      Press me
    </button>
  )
}
```
