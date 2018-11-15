import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'
import './main.css'

let store = createStore(todoApp)

let appElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  appElement
)
