import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'rxjs';
import './index.css';
import App from './components/App';
import counter from './reducers';


const store = createStore(counter)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
)

render()
store.subscribe(render)
