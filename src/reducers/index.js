const initialState = { lastValue: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LAST_VALUE':
      return { lastValue: action.value }
    default:
      return state
  }
}
