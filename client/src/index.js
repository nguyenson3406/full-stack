import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './containers/App'

import { Provider } from 'react-redux';

// import rootReducer from './store/reducers/rootReducer'
import reduxStrore, { persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals';
import Languages from './components/Languages/Languages';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={reduxStrore}>
      <PersistGate persistor={persistor}>
        <Languages>
          <App />
        </Languages>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
