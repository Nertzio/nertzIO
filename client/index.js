import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './redux'
import Routes from './routes'


ReactDOM.render(
  <Provider store={store} className="data-reactroot">
    <Routes />
  </Provider>,
  document.getElementById('app')
)
