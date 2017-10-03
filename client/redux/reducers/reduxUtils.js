import store from '../redux';
import * as bulkActionCreators from '../redux'
const {
  updateP1BigStack,
  updateP1DrawnStack,
  updateP1LittleStack,
  updateP1Solitaire1Stack,
  updateP1Solitaire2Stack,
  updateP1Solitaire3Stack,
  updateP1Solitaire4Stack,
} = bulkActionCreators;

export function updateStackByPlayer(stackKey, newState) {
  const actionCreatorKey = `update${stackKey}`
  store.dispatch(bulkActionCreators[actionCreatorKey](newState))
}
