import { typeActionsRedux } from './index'

describe('TypeActionsRedux', () => {
  it('Should return an object with created types', () => {
    const { types } = typeActionsRedux('scope', {
      increment: () => ({}),
      decrement: () => ({}),
    })

    expect(types).toEqual({
      INCREMENT: 'scope/INCREMENT',
      DECREMENT: 'scope/DECREMENT',
    })
  })

  it('Should return an object with functions', () => {
    const { actions } = typeActionsRedux('scope', {
      increment: () => ({}),
      decrement: () => ({}),
    })

    expect(actions).toEqual({
      increment: expect.any(Function),
      decrement: expect.any(Function),
    })
  })

  it('Should execute the functions with arguments and return an object containing the parameter and type created', () => {
    const { actions } = typeActionsRedux('scope', {
      increment: (count) => ({ payload: { count } }),
      getUser: (id) => ({ meta: { id } }),
    })

    expect(actions.increment(1)).toEqual({
      payload: { count: 1 },
      type: 'scope/INCREMENT',
    })
    expect(actions.getUser(1)).toEqual({
      meta: { id: 1 },
      type: 'scope/GET_USER',
    })
  })
})
