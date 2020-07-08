export const typeActionsRedux = (scope, untypedActions) => {
  const actions = {}
  const types = {}
  const keys = Object.keys(untypedActions)

  for (let i = 0; i < keys.length; i++) {
    const type = keys[i]
    const TYPE = type.replace(/([A-Z])/g, '_$1').toUpperCase()

    types[TYPE] = `${scope}/${TYPE}`

    actions[type] = (...args) => ({
      ...untypedActions[type](...args),
      type: types[TYPE],
    })
  }

  return {
    actions,
    types,
  }
}
