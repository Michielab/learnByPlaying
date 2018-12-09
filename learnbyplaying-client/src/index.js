import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/main/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './ducks/ruducers/reducers';
import 'typeface-work-sans';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
