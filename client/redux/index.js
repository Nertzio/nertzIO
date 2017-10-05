import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import {
  firebaseRefs,
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
  createNFieldStackReducers,
} from './reducers';

const reducer = combineReducers({
  user,
  firebaseRefs,
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
  // see note in ./dynamicFieldStackReducerGenerator about this:
  ...createNFieldStackReducers(32),
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, middleware);

export * from './user'
export * from './reducers';
