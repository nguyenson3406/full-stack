import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './containers/App'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const reduxStrore = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

root.render(
  <React.StrictMode>
    <Provider store={reduxStrore}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
