import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './containers/App'

import { Provider } from 'react-redux';

// import rootReducer from './store/reducers/rootReducer'
import reduxStrore, { persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={reduxStrore}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
