import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import userInfo from './user-info'
import {
  game,
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
} from './reducers';

const reducer = combineReducers({
  user,
  userInfo,
  game,
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, middleware);

export * from './user'
export * from './user-info'
export * from './reducers';
